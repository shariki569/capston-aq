import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "env/.env") });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
  ssl: String(process.env.DB_SSL || "").toLowerCase() === "true"
    ? { rejectUnauthorized: false }
    : undefined,
});

async function runFile(label, filePath) {
  const sql = fs.readFileSync(filePath, "utf8");
  console.log("Running", label, "...");
  await pool.query(sql);
  console.log("OK:", label);
}

try {
  const [ping] = await pool.query("SELECT 1 AS ok, DATABASE() AS db");
  console.log("Connected:", ping[0]);

  await runFile("schema.sql", path.join(__dirname, "sql/schema.sql"));
  await runFile("seed.sql", path.join(__dirname, "sql/seed.sql"));

  const [tables] = await pool.query("SHOW TABLES");
  console.log(
    "Tables:",
    tables.map((r) => Object.values(r)[0]).join(", ")
  );

  const [counts] = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM contact_details) AS contacts,
      (SELECT COUNT(*) FROM pages) AS pages,
      (SELECT COUNT(*) FROM sections) AS sections,
      (SELECT COUNT(*) FROM amenities) AS amenities
  `);
  console.log("Seed counts:", counts[0]);
} catch (err) {
  console.error("FAILED:", err.code || "", err.errno || "", err.message);
  console.error(err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
