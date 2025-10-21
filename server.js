const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const pool = require("./src/config/db.js");
const createDBTables = require("./src/data/createDBTables.js");
dotenv.config();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Create DB Tables
createDBTables();

app.listen(PORT, ()=> {
    console.log(`App is listening on port ${PORT}`);
});