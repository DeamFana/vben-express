const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'franztest',
  waitForConnections: true,
  connectionLimit: 10  // 连接池提升性能
});
module.exports = pool.promise();  // 支持Promise语法