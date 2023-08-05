const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

exports.handler = async (event) => {
    const epf_id = event.epf_id;
    const MAX_RETRIES = 5;
    let result = null;
    let client;

    // event in this case is a json object with the epf_id
    // Example:
    // {
    // 	"epf_id": 1
    // }

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            client = await pool.connect();
            await client.query("BEGIN");
            await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

            // Check for valid epf_id
            const valid_epf_id = await client.query(
                `SELECT COUNT(*) FROM EPFS WHERE epf_id=$1 AND is_deleted = false`,
                [epf_id]
            );

            if (valid_epf_id.rows[0]["count"] == 0) {
                throw new Error("Non-existent epf");
            }

            const query =
                "UPDATE EPFS SET is_deleted = true WHERE epf_id = $1 AND is_deleted = false RETURNING epf_id";
            result = await client.query(query, [epf_id]);

            await client.query("COMMIT"); // commit delete to EPFs table

            // UPDATE OUTSTANDING EPF COUNT //
            try {
                console.log("Updating outstanding EPF count");
                await client.query("BEGIN");
                const exco_user_ids = await client.query(
                    `SELECT user_id FROM users WHERE user_type=$1`,
                    ["FRE"]
                );
                for (let i in exco_user_ids["rows"]) {
                    // get outstanding EPF count for each FRE
                    let result = await client.query(
                        `SELECT COUNT(*) FROM EPFS WHERE status != $1 AND exco_user_id=$2 AND is_deleted = false`,
                        ["Approved", exco_user_ids["rows"][i]["user_id"]]
                    );

                    // update FRE outstanding EPFs
                    await client.query(
                        `UPDATE users SET outstanding_epf=$1 WHERE user_id=$2`,
                        [
                            result["rows"][0]["count"],
                            exco_user_ids["rows"][i]["user_id"],
                        ]
                    );
                }
                //console.log("Updated outstanding EPF count for FREs");

                // get outstanding EPF count for OSL and ROOT
                const result = await client.query(
                    `SELECT COUNT(*) FROM EPFS WHERE status != $1 AND is_deleted = false`,
                    ["Approved"]
                );

                // update OSL and ROOT outstanding EPFs
                await client.query(
                    `UPDATE users SET outstanding_epf = $1 WHERE user_type != $2`,
                    [result["rows"][0]["count"], "FRE"]
                );
                //console.log("Updated outstanding EPF count for OSL and ROOT");
                await client.query("COMMIT");
                // sendEmailToOSF();
                // console.log("sendEmailtoOSF")

                // // Send email to the user
                // const userEmail = event.a_email;
                // sendEmailToUser(userEmail);
                // console.log("sendEmailToUser")
            } catch (e) {
                // ERROR HANDLING FOR UPDATE OUTSTANDING EPF COUNT
                await client.query("ROLLBACK");
                throw e;
            }
            // END UPDATE OUTSTANDING EPF COUNT //

            break; // Breaks the loop if the transaction is successful
        } catch (err) {
            // ERROR HANDLING //
            if (client) {
                await client.query("ROLLBACK");
            }
            if (
                !err.message.includes("could not serialize access") &&
                !err.message.includes("deadlock detected")
            ) {
                throw err;
            }
            if (attempt === MAX_RETRIES - 1) {
                throw new Error("Max delete attempts exceeded");
            }
        } finally {
            if (client) {
                client.release();
            }
        }
    }
    return result.rows[0];
};
