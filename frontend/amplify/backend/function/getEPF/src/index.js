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
    try {
		await client.query("BEGIN");
	
		//Check for epf_id data type
		if (typeof epf_id !== "number") {
			throw new Error("Unexpected data type");
		}
	
		//Check for valid epf_id
		const valid_epf_id = await pool.query(
			`SELECT COUNT(*) FROM EPFS WHERE epf_id = $1 AND is_deleted = false`,
			[epf_id]
		);
		if (valid_epf_id.rows[0]["count"] == 0) {
			throw new Error("Non-existent epf");
		}
	
		const result = await pool.query(
		  	"SELECT * FROM EPFS WHERE epf_id = $1 AND is_deleted = false",
			[epf_id]
		);
		await client.query("COMMIT");
		//Returns EPF Data
		return result["rows"];
	} catch (e) {
		await client.query("ROLLBACK");
		throw e;
	} finally {
		client.release();
	}
};
