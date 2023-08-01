const { Pool } = require('pg');

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

	try {
        await client.query("BEGIN");
        const result = await pool.query(
          `SELECT * FROM EPFS WHERE is_deleted = false`
        );
        await client.query("COMMIT");

        //Returns all EPF Data
        return {
            headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*"
			},
			
			statusCode: 200,
            body: result["rows"]
        };

    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
}