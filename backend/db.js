import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // ⚠️ replace with your MySQL username
  password: "root",  // ⚠️ replace with your MySQL password
  database: "complaint_portal"
});
