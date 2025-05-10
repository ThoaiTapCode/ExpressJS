// models/Search.js
const pool = require('../config/db');

class Search {
    static async findUserByUsername(username) {
        const [results] = await pool.query(
            'SELECT id, username, role, created_at, avatar_url FROM users WHERE username LIKE ?',
            [`%${username}%`]
        );
        return results[0] || null; // Trả về người dùng đầu tiên hoặc null nếu không tìm thấy
    }
}

module.exports = Search;