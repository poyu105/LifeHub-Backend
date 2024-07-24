const User = require('../Models/User')
const bcrpyt = require('bcrypt')

//Register
exports.register = async (req, res) =>{
    const {username, email, password, phoneNumber, birthDate} = req.body;
    try {
        //檢查是否有相同用戶名、email
        const existingUser = await User.findOne({$or: [{username},{email}]});
        if(existingUser){
            return res.status(400).json({message:'Username or email already exists'});
        }

        //加密password
        const salt = bcrpyt.genSalt(10);
        const hashPassword = await bcrpyt.hash(password, salt);  
        
        //創建用戶
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            phoneNumber,
            birthDate
        });

        await newUser.save();
        res.status(201).json({message:'User register successfully'});
        
    } catch (error) {
        res.status(500).json({message:'Error register user', error});
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

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({message:'Error logging in', error});   
    }
}