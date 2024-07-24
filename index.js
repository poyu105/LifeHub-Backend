const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./api/userRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // 根據前端服務器地址進行設置
}));
app.use('/api/users', userRoutes); // 設定路由前綴

mongoose.connect('mongodb://localhost:27017/lifehub')
    .then(() => {
    console.log('MongoDB connected');
})  .catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.listen(3001, () => {
    console.log('Server is running');
});
