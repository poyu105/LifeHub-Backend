const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    birthDate: {
        type: Date,
        require: true
    }
}, {timestamps:true})//mongoose 自動添加createAt、updateAt

module.exports = mongoose.model('users', UserSchema)