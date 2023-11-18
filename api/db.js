import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
// dotenv.config({ path: "./env/acc.env" });
// if (process.env.NODE_ENV !== "production") {
//   dotenv.config({ path: "./env/acc.env" });
// } else {
//   dotenv.config({ path: "./env/local.env" });
// }
export const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 30,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});


// db.getConnection((err, connection) => {
//   connection.release();
// })

export default db;
