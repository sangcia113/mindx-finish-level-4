const User = require('../models/userModel');
const UserProject = require('../models/userProjectModel');
const userService = {
    createUser: async userData => await new User(userData).save(),

    getUserById: async userId => await User.findById(userId).select('-password'),

    // getAllUser: async () => await User.find().select(['fullName', 'avatarLink']),

    getUserByUsername: async username => await User.findOne({ username }),

    updateUser: async (userId, userData) => await User.findByIdAndUpdate(userId, userData),
};
module.exports = userService;
