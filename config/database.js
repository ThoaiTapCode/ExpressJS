const mysql = require('mysql2/promise');

// Thử kết nối với người dùng mới (nếu đã tạo)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'express_user',
    password: 'express123',
    database: 'social_media_web',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool; 