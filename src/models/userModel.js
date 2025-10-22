const pool = require("../config/db.js");

const createUser = async (name, email, hashedPass, phone) => {
    const query = `
        INSERT INTO users (name, email, password, phone)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    try {
        const result = await pool.query(query, [name, email, hashedPass, phone]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getUserById = async (id) => {
    const query = `
        SELECT * FROM users
        WHERE id = $1;
    `;

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    const query = `
        SELECT * FROM users
        WHERE email = $1;
    `;

    try {
        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {createUser, getUserById, getUserByEmail}