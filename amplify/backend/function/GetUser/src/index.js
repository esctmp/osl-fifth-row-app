const { Pool } = require("pg");

const rdsConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
const pool = new Pool(rdsConfig);

exports.handler = async (event) => {
    const { user_id } = event.queryStringParameters;
    try {
        const user = await getUser(user_id);
        console.log(user);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            body: JSON.stringify(user),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Server Error" }),
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
        };
    }
};

async function getUser(user_id) {
    if (!user_id) {
        throw new Error("User ID must be provided");
    }
    const client = await pool.connect();
    try {
        const query =
            "SELECT * FROM users WHERE user_id = $1 AND is_deleted = false";
        const result = await client.query(query, [user_id]);
        return result.rows;
    } finally {
        client.release();
    }
}
