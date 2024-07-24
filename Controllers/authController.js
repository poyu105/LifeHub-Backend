const User = require('../Models/User')
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
        console.log('B:進入查找用戶');
        //查找用戶
        const user = await User.findOne({email});
        if(!user){
            console.log('B:查無用戶，已退出登入');
            return res.status(400).json({message:'Invalid credentials'});
        }

        console.log('B:進入核對密碼');
        //核對密碼
        const isMatch = await bcrpyt.compare(password, user.password);
        if(!isMatch){
            console.log('B:密碼核對失敗，退出登入');
            return res.status(400).json({message:'Invalid credentials'});
        }
        console.log('B:登入成功');
        res.status(200).json({message:'User login successfully'});
    } catch (error) {
        console.log('B:登入失敗');
        res.status(500).json({message:'Error logging in', error});   
    }
}