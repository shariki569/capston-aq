import mysql from "mysql2/promise";
import dotenv from "dotenv";

// dotenv.config({ path: "./env/acc.env" });
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
export const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});
console.log('Database pool created successfully');
export default db;

