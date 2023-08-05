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

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            client = await pool.connect();
            await client.query("BEGIN");
            await client.query(
                "SET TRANSACTION ISOLATION LEVEL READ COMMITTED"
            );

            // Check for valid epf_id
            const valid_epf_id = await client.query(
                `SELECT COUNT(*) FROM EPFS WHERE epf_id = $1 AND is_deleted = false`,
                [epf_id]
            );

            if (valid_epf_id.rows[0]["count"] == 0) {
                throw new Error("Non-existent epf");
            }

            result = await client.query(
                "SELECT * FROM EPFS WHERE epf_id = $1 AND is_deleted = false",
                [epf_id]
            );

            await client.query("COMMIT");
            break; // Break the retry loop upon successful transaction
        } catch (err) {
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
                throw new Error("Max retrieval attempts exceeded");
            }
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        } finally {
            if (client) {
                client.release();
            }
        }
    }

    if (result["rows"].length === 0) {
        return null;
    }
    return result["rows"];
};
