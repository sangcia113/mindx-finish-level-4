const mongoose = require('mongoose');
const MentionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    createdDate: { type: Date, default: Date.now() },
});
const Mention = mongoose.model('Mention', MentionSchema);
module.exports = Mention;
