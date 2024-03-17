const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: { type: String, default: null },
    gender: { type: String, enum: ['male', 'female', 'other'], default: null },
    birthday: { type: Date, default: null },
    description: { type: String, default: null },
    avatarLink: { type: String, default: null },
    email: { type: String, default: null },
    numberPhone: { type: String, default: null },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    createdDate: { type: Date, require: true, default: Date.now() },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
