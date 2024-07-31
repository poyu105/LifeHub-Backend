const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const multer = require('multer');
const upload = multer({dest:'uploads/'});// 設置文件上傳的目錄

//創建貼文
router.post('/',upload.array('mediaFiles'),postController.createPost);
//獲取所有貼文
router.get('/',postController.getPosts);

module.exports = router;