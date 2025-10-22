const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const pool = require("./src/config/db.js");
const createDBTables = require("./src/data/createDBTables.js");
const errorHandler = require("./src/middlewares/errorHandler.js");
dotenv.config();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Create DB Tables
createDBTables();

// Routes
app.use("/api/users", require("./src/routes/user.js"));

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`App is listening on port ${PORT}`);
});