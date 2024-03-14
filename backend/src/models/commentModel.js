const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', require: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    content: { type: String, require: true },
    createdDate: { type: Date, require: true, default: Date.now() },
});
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
