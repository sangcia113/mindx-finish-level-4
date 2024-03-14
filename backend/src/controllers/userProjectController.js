const {
    createUserProject,
    getAllUserProject,
    getUserProjectById,
    getUserProjectByUserId,
    getUserProjectByProjectId,
    updateUserProject,
    deleteUserProject,
} = require('../services/userProjectService');
const userProjectController = {
    createUserProject: async (req, res) => {
        try {
            const userProjectData = req.body;
            await createUserProject(userProjectData);
            res.status(201).json({ err: 0, msg: 'Insert user project successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAllUserProject: async (req, res) => {
        try {
            const results = await getAllUserProject();
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getUserProjectById: async (req, res) => {
        try {
            const { userProjectId } = req.params;
            const results = await getUserProjectById(userProjectId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getUserProjectByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const results = await getUserProjectByUserId(userId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getUserProjectByProjectId: async (req, res) => {
        try {
            const { projectId } = req.params;
            const results = await getUserProjectByProjectId(projectId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateUserProject: async (req, res) => {
        try {
            const { userProjectId } = req.params;
            const userProjectData = req.body;
            await updateUserProject(userProjectId, userProjectData);
            res.status(201).json({ err: 0, msg: 'Update user project successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteUserProject: async (req, res) => {
        try {
            const { userProjectId } = req.params;
            await deleteUserProject(userProjectId);
            res.status(201).json({ err: 201, msg: 'Delete user project successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = userProjectController;
