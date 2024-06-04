const pool = require("../db/dbConnection");

const executeQuery = async (query, params) => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    throw new Error("Error executing the query: " + error.message);
  }
};

module.exports = { executeQuery };
