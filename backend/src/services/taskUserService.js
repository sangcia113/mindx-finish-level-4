const TaskUser = require('../models/taskUserModel');
const User = require('../models/userModel');

const taskUserService = {
    // ok
    createTaskUser: async taskUserData => await new TaskUser(taskUserData).save(),

    getTaskUserById: async taskUserId => await TaskUser.findById(taskUserId),

    // ok
    getUserNotInTask: async taskId => {
        const userInTask = await TaskUser.find({ taskId }).distinct('userId');
        return await User.find({ _id: { $nin: userInTask } }).select('_id fullName');
    },

    getTaskUserByQuery: async query => await TaskUser.find(query).populate('userId', 'fullName'),

    updateTaskUser: async (taskUserId, taskUserData) =>
        await TaskUser.findByIdAndUpdate(taskUserId, taskUserData),

    // ok
    deleteTaskUser: async taskUserId => await TaskUser.findByIdAndDelete(taskUserId),
};

module.exports = taskUserService;
