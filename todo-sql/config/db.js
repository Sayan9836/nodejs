import mysql from "mysql2";

const sqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sayan@1234",
  database: "employeedb",
});

export { sqlConnection };
