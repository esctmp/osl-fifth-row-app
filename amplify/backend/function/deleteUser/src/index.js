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
    try {
        const { user_id } = event.queryStringParameters;
        const result = await deleteUser(user_id);
        
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            body: JSON.stringify({ message: "Server Error" }),
        };
    }
};

async function deleteUser(user_id, pool) {
    if (!user_id) {
        throw new Error("User ID must be provided");
    }

    const MAX_RETRIES = 5;
    let client;
    let result = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            client = await pool.connect();
            await client.query("BEGIN");
            await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
            const selectQuery =
            "SELECT * FROM users WHERE user_id = $1 AND is_deleted = false FOR UPDATE";
          const selectResponse = await client.query(selectQuery, [user_id]);
    
          // If no row selected, throw error
          if (selectResponse.rowCount == 0) {
            throw new Error("User does not exist or has already been deleted.");
          }
    
          const query =
            "UPDATE users SET is_deleted = true WHERE user_id = $1 AND is_deleted = false RETURNING *;";
          result = await client.query(query, [user_id]);
            // Rest of the function remains the same...
            // (Copy the contents of your original deleteUser function here)

            await client.query("COMMIT");
            break; // Break the retry loop upon successful transaction
        } catch (err) {
            // Error handling remains the same...
        } finally {
            if (client) {
                client.release();
            }
        }
    }
    return result.rows[0];
}