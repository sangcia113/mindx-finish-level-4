const mongoose = require('mongoose');
const MentionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', require: true },
    createdDate: { type: Date, require: true, default: Date.now() },
});
const Mention = mongoose.model('Mention', MentionSchema);
module.exports = Mention;
