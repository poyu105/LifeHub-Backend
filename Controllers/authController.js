const User = require('../Models/User')
const Post = require('../Models/Post')
const bcrpyt = require('bcrypt')

//Register
exports.register = async (req, res) =>{
    const {username, email, password, phoneNumber, birthDate} = req.body;
    try {
        console.log('B:進入註冊程序')
        //檢查是否有相同用戶名、email
        const existingUser = await User.findOne({$or: [{username},{email}]});
        if(existingUser){
            console.log('B:出現相同用戶名，已退出註冊程序\n=========')
            return res.status(400).json({message:'Username or email already exists'});
        }
        //加密password
        const salt = await bcrpyt.genSalt(10);
        const hashPassword = await bcrpyt.hash(password, salt);  
        console.log('B:password加密完成')
        //創建用戶
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            phoneNumber,
            birthDate
        });

        await newUser.save();
        console.log('B:註冊成功\n=========')
        res.status(201).json({message:'User register successfully'});
        
    } catch (error) {
        console.log('B:註冊過程中發生錯誤，傳入的資料:',{username, email, password, phoneNumber, birthDate})
        console.log('=========')
        res.status(500).json({message:'B:註冊過程中發生錯誤', error});
    }
}
//Login
exports.login = async (req,res) =>{
    const {email, password} = req.body;
    try {
        //查找用戶
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }
        //核對密碼
        const isMatch = await bcrpyt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
        res.status(200).json({
            message: 'User login successfully',
            user: { id: user._id, username: user.username, email: user.email, birthDate: user.birthDate, phoneNumber: user.phoneNumber }
        });
    } catch (error) {
        res.status(500).json({message:'Error logging in', error});   
    }
}
// Update
exports.update = async (req, res) => {
    const userId = req.params.id;
    const { username, email, phoneNumber, birthDate } = req.body;

    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        user.username = username;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.birthDate = birthDate;
        const updatedUser = await user.save();
        res.status(200).json({
            message: 'User updated successfully',
            user: { 
                id: updatedUser._id, 
                username: updatedUser.username, 
                email: updatedUser.email, 
                phoneNumber: updatedUser.phoneNumber, 
                birthDate: updatedUser.birthDate 
            }
        });
    } catch (error) {
        console.log(`Error updating user: ${error}`);
        res.status(500).json({ message: 'Error updating user', error });
    }
}
// 獲取貼文
exports.getPosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const posts = await Post.find({ userId: userId });
        res.status(200).json(posts);
    } catch (error) {
        console.error(`獲取貼文失敗: ${error}`);
        res.status(500).json({ message: "獲取貼文失敗" });
    }
};