const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// 註冊路由
router.post('/register', authController.register);

// 登入路由
router.post('/login', authController.login);

//更新路由
router.put('/update/:id', authController.update);

//獲取用戶貼文
router.get('/:id/posts', authController.getPosts);

module.exports = router;