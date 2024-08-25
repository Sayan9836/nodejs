import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employee",
  password: "Sayan@1234",
  port: 5432,
});

export { pool };
