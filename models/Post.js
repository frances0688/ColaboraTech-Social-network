const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    bodyText: {
        type: String,
        required: [true, "Complete body test of post"]
    },
    asset: String,
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    userId: {
        type: ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

PostSchema.index({bodyText: "text"});  

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;