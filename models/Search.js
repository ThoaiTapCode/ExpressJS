const pool = require('../config/database');

class Search {
    static async findUserByUsername(username) {
        try {
            // Tìm kiếm chính xác thay vì tìm theo mẫu (LIKE)
            const [users] = await pool.query(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );
            
            // Trả về kết quả tìm kiếm với thông tin chi tiết
            if (users.length > 0) {
                return {
                    found: true,
                    user: users[0]
                };
            } else {
                // Nếu không tìm thấy, thử tìm kiếm mờ (LIKE)
                const [similarUsers] = await pool.query(
                    'SELECT * FROM users WHERE username LIKE ?',
                    [`%${username}%`]
                );
                
                if (similarUsers.length > 0) {
                    return {
                        found: true,
                        exact: false,
                        users: similarUsers
                    };
                } else {
                    return {
                        found: false,
                        message: 'Không tìm thấy người dùng.'
                    };
                }
            }
        } catch (error) {
            console.error('Lỗi tìm kiếm người dùng:', error);
            throw error;
        }
    }
}

module.exports = Search; 