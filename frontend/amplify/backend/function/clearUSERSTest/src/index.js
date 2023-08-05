const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.TEST_DB_USER,
    host: process.env.TEST_DB_HOST,
    database: process.env.TEST_DB_NAME,
    password: process.env.TEST_DB_PASSWORD,
    port: 5432,
});

let client;

exports.handler = async (event) => {
    try {
        client = await pool.connect();
        await client.query("BEGIN");
        // delete all rows from the epfs table
        await client.query("DELETE FROM users");
        // commit the transaction
        await client.query("COMMIT");
        return {
            statusCode: 200,
            body: JSON.stringify("Successfully cleared the users table"),
        };
    } catch (e) {
        await client.query("ROLLBACK");
        return {
            statusCode: 500,
            body: JSON.stringify("Failed to clear the users table"),
        };
    }
};
