const {
    createUserProject,
    getUserProjectById,
    getUserProjectByQuery,
    updateUserProject,
    deleteUserProject,
    getUserNotInProject,
} = require('../services/userProjectService');
const userProjectController = {
    // ok
    createUserProject: async (req, res) => {
        const userProjectData = req.body;

        try {
            await createUserProject(userProjectData);

            res.status(200).json({ err: 0, msg: 'Add successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    getUserProjectById: async (req, res) => {
        const { userProjectId } = req.params;
        try {
            const results = await getUserProjectById(userProjectId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    getUserProjectByQuery: async (req, res) => {
        const { userId, projectId, role, dateOfJoin } = req.query;
        const query = {};
        if (userId) query.userId = userId;
        if (projectId) query.projectId = projectId;
        if (role) query.role = role;
        if (dateOfJoin) query.dateOfJoin = dateOfJoin;
        try {
            const results = await getUserProjectByQuery(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    getUserNotInProject: async (req, res) => {
        const { userId } = req.decoded;
        const { projectId } = req.params;

        try {
            const results = await getUserNotInProject(userId, projectId);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    updateUserProject: async (req, res) => {
        const { userProjectId } = req.params;
        const userProjectData = req.body;

        try {
            await updateUserProject(userProjectId, userProjectData);

            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    deleteUserProject: async (req, res) => {
        const { userProjectId } = req.params;

        try {
            await deleteUserProject(userProjectId);

            res.status(200).json({ err: 0, msg: 'Delete successfully!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = userProjectController;
