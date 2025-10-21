const pg = require("pg");
const {Pool} = pg;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

pool.on('connect', () => {
    console.log("Connected to PostgreSQL Database");
});

module.exports = pool;