const User = require('../models/userModel');
const userService = {
    createUser: async userData => await new User(userData).save(),
    getAllUser: async () => await User.find(),
    getUserById: async userId => await User.findById(userId),
    getUserByUsername: async username => await User.findOne({ username }),
    updateUser: async (userId, userData) => await User.findByIdAndUpdate(userId, userData),
    deleteUser: async userId => await User.findByIdAndDelete(userId),
};
module.exports = userService;
