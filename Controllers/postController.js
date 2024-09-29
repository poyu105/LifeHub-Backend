const Post = require('../Models/Post');

// 創建新貼文
exports.createPost = async (req,res)=>{
    try {
        const {userId, userName, city, district, content, postDate, tags} = req.body;
        // 將上傳的檔案路徑儲存到資料庫
        const mediaFiles = req.files.map(file => {
            return {
                url: file.path,
                type: file.mimetype.startsWith('image/') ? 'image' : 'video'
            };
        });
        const newPost = new Post({
            userId,
            userName,
            city,
            district,
            mediaFiles,
            content,
            postDate,
            tags
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.log(`B:Error creating post: ${error}\n`);
        res.status(500).json({message: 'Failed to create post'});
    }
}

// 獲取所有貼文
exports.getAllPosts = async (req, res)=>{
    try {
        const posts = await Post.find().sort({ createdAt: -1 });//依照最新時間排序
        res.status(200).json(posts);
    } catch (error) {
        console.log(`\n B: Error fetching posts on postController.getAllPosts: ${error}\n`);
        res.status(500).json({message: `Failed to fetch posts`});
    }
}
// 獲取標籤為美食推薦的貼文
exports.getFoodRec = async (req, res) => {
    try {
        const posts = await Post.find({ tags: '#美食推薦' }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.log(`\n B: Error fetching posts on postController.getFoodRec: ${error}\n`);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
}
//獲取標籤為交通指南的貼文
exports.getTrafficGuide = async (req, res) => {
    try {
        const posts = await Post.find({tags: '#交通指南'}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.log(`\n B: Error fetching posts on postController.getTrafficGuide: ${error}\n`);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
}
//獲取標籤為購物指南的貼文
exports.getShoppingGuide = async (req, res) => {
    try {
        const posts = await Post.find({tags: '#購物指南'}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.log(`\n B: Error fetching posts on postController.getShoppingGuide: ${error}\n`);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
}
//獲取標籤為休閒娛樂的貼文
exports.getEntertainment = async (req, res) => {
    try {
        const posts = await Post.find({tags: '#休閒娛樂'}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.log(`\n B: Error fetching posts on postController.getEntertainment: ${error}\n`);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
}