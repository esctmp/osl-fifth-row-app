const { Pool } = require("pg");

let pool;

const RETRY_DELAY_MS = 200;
const MAX_RETRIES = 5;

exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const epf_id = requestBody.epf_id;
  if(event.test==1){
      pool = new Pool({
        user: process.env.TEST_DB_USER,
        host: process.env.TEST_DB_HOST,
        database: process.env.TEST_DB_NAME,
        password: process.env.TEST_DB_PASSWORD,
        port: 5432,
        });
    } else {
      pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: 5432,
        });
      }

  if (typeof epf_id !== "number") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid epf_id data type" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
  }

  let client;
  let result = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      client = await pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

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
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Max retrieval attempts exceeded" }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
        };
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  if (!result || result["rows"].length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "EPF not found" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
  }

  // Sort the properties alphabetically for each object in the array
  const sortedRows = result["rows"].map((row) => {
    const sortedRow = {};
    Object.keys(row)
      .sort()
      .forEach((key) => {
        sortedRow[key] = row[key];
      });
    return sortedRow;
  });
  console.log(sortedRows)
  return {
    body: JSON.stringify(sortedRows),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    statusCode: 200,
  };
};