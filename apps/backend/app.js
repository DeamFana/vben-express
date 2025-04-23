import cors from 'cors';
import express from 'express'; // 允许所有来源访问，一定要写在路由前面才能生效

// 注册路由到主应用
import usersRouter from './api/users.js';

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json()); // 解析JSON请求体:cite[5]:cite[10]
app.use('/api/users', usersRouter);

// 处理根路径的GET请求
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 返回JSON数据
app.get('/api/greeting', (req, res) => {
  res.json({ message: 'Welcome to Express API!', status: 200 });
});

// app.post('/api/users', (req, res) => {
//     const userData = req.body;
//     if (!userData.name || !userData.email) {
//       return res.status(400).json({ error: 'Missing name or email' });
//     }
//     res.status(201).json({
//       message: 'User created',
//       user: { id: Date.now(), ...userData }
//     });
//   });

// 启动服务器
app.listen(port, () => {
  console.warn(`Server running at http://localhost:${port}`);
});

export default app;
