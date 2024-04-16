const mongoose = require('mongoose');
const { USER_GENDER } = require('../constants');
const userSchema = new mongoose.Schema({
    fullName: { type: String, default: null },
    gender: { type: String, enum: USER_GENDER, default: null },
    dateOfBirth: { type: Date, default: null },
    description: { type: String, default: null },
    avatar: { type: String, default: null },
    email: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
