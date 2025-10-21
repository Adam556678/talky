const pool = require("../config/db.js");

const createDBTables = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        phone VARCHAR(50) UNIQUE
    );

    CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        owner INT REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        author INT REFERENCES users(id) ON DELETE SET NULL,
        receiver_id INT REFERENCES users(id) ON DELETE CASCADE,
        group_id INT REFERENCES groups(id) ON DELETE CASCADE,
        time TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS group_members(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        group_id INT REFERENCES groups(id) ON DELETE CASCADE,
        role VARCHAR(50) DEFAULT 'member', -- 'member', 'admin', 'owner'
        joined_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS group_bans(
        id SERIAL PRIMARY KEY,
        group_id INT REFERENCES groups(id) ON DELETE CASCADE,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        banned_at TIMESTAMP DEFAULT NOW(),
        reason TEXT
    );

    CREATE TABLE IF NOT EXISTS contacts(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        contact_id INT REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, contact_id)
    );`;

    try {
        await pool.query(query);
        console.log("Db Tables Created");
    } catch (error) {
        console.log(error);
    }
};

module.exports = createDBTables;