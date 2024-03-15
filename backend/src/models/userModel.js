const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: { type: String, require: true },
    gender: { type: String, require: true, enum: ['male', 'female', 'other'] },
    birthday: { type: Date, require: true },
    description: { type: String, default: null },
    avatarLink: { type: String, default: null },
    email: { type: String, require: true, unique: true },
    numberPhone: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    createdDate: { type: Date, require: true, default: Date.now() },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
