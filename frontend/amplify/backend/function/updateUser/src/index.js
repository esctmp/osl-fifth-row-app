

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { Pool } = require('pg');

const rdsConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
const pool = new Pool(rdsConfig);

exports.handler = async (event) => {
  const { user_id, name, email, type } = JSON.parse(event.body);

  try {
    const updatedUser = await updateUser(user_id, name, email, type);
    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    }
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error' }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    }
    };
  }
};

async function updateUser(user_id, name, email, type) {
  // Check if necessary parameters are provided
  if (!user_id || !name || !email || !type) {
    throw new Error("Missing parameters: user_id, name, email, and type are required.");
  }

  // Check if email format is valid
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }

  const query = "UPDATE users " +
    "SET name=$1, email=$2, user_type=$3 " +
    "WHERE user_id=$4 AND is_deleted=false " +
    "RETURNING *";

  const client = await pool.connect();
  try {
    const response = await client.query(query, [name, email, type, user_id]);
    // Check if any row was affected
    if (response.rowCount === 0) {
      throw new Error("No record found with the given user_id.");
    }
    return response.rows[0]; // Return the updated record
  } finally {
    client.release();
  }
}