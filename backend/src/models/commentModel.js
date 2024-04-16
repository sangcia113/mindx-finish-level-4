const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
});
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
