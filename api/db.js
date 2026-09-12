import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localEnv = path.join(__dirname, "env", ".env");

if (fs.existsSync(localEnv)) {
  dotenv.config({ path: localEnv });
} else {
  dotenv.config();
}

const host = process.env.MYSQLHOST || process.env.DB_HOST;
const user = process.env.MYSQLUSER || process.env.DB_USER;
const password = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD;
const database = process.env.MYSQLDATABASE || process.env.DB_DATABASE;
const port = Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306);

const sslFlag = String(process.env.DB_SSL || process.env.MYSQL_SSL || "").toLowerCase();
const useSsl =
  sslFlag === "true" ||
  (sslFlag !== "false" && host && host.includes("aivencloud.com"));

export const db = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
});

console.log(
  `Database pool ready → ${host}:${port}/${database} (ssl=${Boolean(useSsl)})`
);
export default db;
