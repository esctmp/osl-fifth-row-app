const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const client = await pool.connect();

    const epf_id = event.epf_id;

    // event in this case is a json object with the epf_id
    // Example:
    // {
    // 	"epf_id": 1
    // }

    try {
        await client.query("BEGIN");

        //Check for epf_id data type
        if (typeof epf_id !== "number") {
            throw new Error("Unexpected data type");
        }

        //Check for valid epf_id
        const valid_epf_id = await pool.query(
            `SELECT COUNT(*) FROM EPFS WHERE epf_id=$1 AND is_deleted = false`,
            [epf_id]
        );
        if (valid_epf_id.rows[0]["count"] == 0) {
            throw new Error("Non-existent epf");
        }

        const query =
            "UPDATE EPFS SET is_deleted = true WHERE epf_id = $1 AND is_deleted = false RETURNING epf_id";
        const result = await pool.query(query, [epf_id]); //Returns {"epf_id": value}

        // await pool.query(
        //     `UPDATE FILES SET is_deleted = true WHERE epf_id = $1 AND is_deleted = false`,
        //     [epf_id]
        // );

        await client.query("COMMIT");

        return {
            statusCode: 200,

            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },

            epf_id: result.rows[0],
        };
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
};
