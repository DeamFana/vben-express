// 用户路由CRUD测试
import express from 'express';

import pool from '../db.js'; // 引入数据库连接池

// 引入express
const router = express.Router(); // 创建路由

// 更新用户（routes/users.js）
router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query(
      'UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?',
      [name, email, req.params.id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 查询用户（routes/users.js）
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json({ code: 0, data: rows, error: null, message: 'ok' });
  } catch (error) {
    res.status(500).json({
      errcode: error.code,
      errmsg: error.message,
    });
  }
});

// 插入新用户
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email],
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
