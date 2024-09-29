const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // 根據前端服務器地址進行設置
}));

// 提供靜態文件
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes); // 用戶相關
app.use('/api/posts', postRoutes); // 貼文相關

mongoose.connect('mongodb://localhost:27017/lifehub')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.listen(3001, () => {
    console.log('Server is running');
});
