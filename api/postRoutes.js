const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const multer = require('multer');
const upload = multer({dest:'uploads/'});// 設置文件上傳的目錄

//創建貼文
router.post('/',upload.array('mediaFiles'),postController.createPost);
//獲取所有貼文
router.get('/',postController.getAllPosts);
//獲取標籤為美食推薦的貼文
router.get('/foodRec',postController.getFoodRec);
//獲取標籤為交通指南的貼文
router.get('/trafficGuide',postController.getTrafficGuide);
//獲取標籤為購物指南的貼文
router.get('/shoppingGuide',postController.getShoppingGuide);
//獲取標籤為休閒娛樂的貼文
router.get('/entertainment',postController.getEntertainment);
module.exports = router;