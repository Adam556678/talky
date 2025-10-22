const pool = require("../config/db.js");

const createOTP = async (userId, otp, expires) => {
    const query = `
        INSERT INTO userOTP (userId, otp, expires)
        VALUES ($1, $2, $3)
    `;

    try {
        await pool.query(query, [userId, otp, expires]);
    } catch (error) {
        throw error;
    }
};

const getUserOTP = async (userId) => {
    const query = `
        SELECT * FROM userOTP
        WHERE userId = $1;
    `;

    try {
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteOTP = async (id) => {
    const query = `
        DELETE FROM userOTP
        WHERE id = $1
    `;

    try {
        await pool.query(query, [id]);
    } catch (error) {
        throw error;
    }
};

const updateUserVerification = async (userId) => {
    const query = `
        UPDATE users 
        SET verified = TRUE
        WHERE id = $1;
    `;

    try {
        await pool.query(query, [userId]);
    } catch (error) {
        
    }
};

module.exports = {createOTP, getUserOTP, deleteOTP, updateUserVerification};