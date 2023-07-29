


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
  const user_id = event.user_id; // Assuming the user_id is passed as an event parameter

  try {
    const result = await getEXCOEPFs(user_id);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify({ error: 'Server Error' }),
    };
  }
};

async function getEXCOEPFs(user_id) {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM EPFS WHERE exco_user_id = $1 AND is_deleted = false';
    const result = await client.query(query, [user_id]);
    return result.rows;
  } finally {
    client.release();
  }
}