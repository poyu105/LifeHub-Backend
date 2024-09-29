const Post = require('../Models/Post');

// 創建新貼文
exports.createPost = async (req,res)=>{
    try {
        const {userId, userName, city, district, content, postDate, tags} = req.body;
        // 將上傳的檔案路徑儲存到資料庫
        const mediaFiles = req.files.map(file => {
            console.log(`檔案名稱: ${file.originalname} \n 檔案類型: ${file.mimetype}`);
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
exports.getPosts = async (req, res)=>{
    try {
        const posts = await Post.find().populate('userId','username');
        console.log(`B: posts: ${posts}\n`);
        res.status(201).json(posts);
    } catch (error) {
        console.log(`B: Error fetching posts: ${error}\n`);
        res.status(500).json({message: `Failed to fetch posts`});
    }
}