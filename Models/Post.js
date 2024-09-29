const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId:{
        type: Schema.ObjectId,
        ref:'users',
        require:true
    },
    userName:{
        type: String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    district:{
        type:String,
        require:true
    },
    mediaFiles: {
        type: [{
            url: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                enum: ['image', 'video'],
                required: true,
            },
        }],
        validate: [arrayLimit, `{PATH} exceeds the limit of 5`],
        required: true,
    },
    content:{
        type:String,
        require:true
    },
    postDate:{
        type:String,
        require:true
    },
    tags:{
        type:[String],
        validate:[arrayLimit, `{PATH} should have at least one tag`],
        require:true
    },
    comments:[{
        userId:{
            type:Schema.Types.ObjectId,
            ref:'users'
        },
        content: String,
        createAt:{
            type:Date,
            default:Date.now
        }
    }],
    ratings:[{
        userId:{
            type:Schema.Types.ObjectId,
            ref:'users'
        },
        rating:{
            type:Number,
            min: 1,
            max: 5
        }
    }]
},{timstamps:true});

function arrayLimit(val){
    return val.length <= 5;
}

module.exports = mongoose.model('Post', PostSchema);