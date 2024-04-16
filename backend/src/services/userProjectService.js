const UserProject = require('../models/userProjectModel');
const User = require('../models/userModel');
const { USER_ROLE } = require('../constants');

const userProjectService = {
    // ok
    // createUserProject: async userProjectData => {
    //     const { projectId, projectRole, projectUser } = userProjectData;

    //     const userProjectDocs = projectUser.map(userId => ({
    //         userId: userId,
    //         projectId,
    //         role: USER_ROLE[projectRole],
    //     }));

    //     return await UserProject.insertMany(userProjectDocs);
    // },

    // ok
    createUserProject: async userProjectData => await new UserProject(userProjectData).save(),

    getUserProjectById: async userProjectId => await UserProject.findById(userProjectId),

    getUserProjectByQuery: async query =>
        await UserProject.find(query).populate('userId', 'fullName'),

    // ok
    getUserNotInProject: async (userId, projectId) => {
        const userInProject = await UserProject.find({ projectId }).distinct('userId');
        return await User.find({ _id: { $nin: [userId, ...userInProject] } }).select(
            '_id fullName'
        );
    },

    updateUserProject: async (userProjectId, userProjectData) =>
        await UserProject.findByIdAndUpdate(userProjectId, userProjectData),

    // ok
    deleteUserProject: async userProjectId => await UserProject.findByIdAndDelete(userProjectId),
};

module.exports = userProjectService;
