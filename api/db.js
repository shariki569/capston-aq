import mysql from "mysql2/promise";
import dotenv from "dotenv";

<<<<<<< HEAD
dotenv.config({path: './env/.env'});
=======
dotenv.config({ path: "./env/acc.env" });
>>>>>>> pages-ver-3.3.3-chatbot-implementation

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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

<<<<<<< HEAD
export default db;



=======
>>>>>>> pages-ver-3.3.3-chatbot-implementation
