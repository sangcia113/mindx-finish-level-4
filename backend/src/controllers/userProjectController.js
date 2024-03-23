const {
    createUserProject,
    getUserProjectById,
    getUserProjectByQuery,
    updateUserProject,
    deleteUserProject,
} = require('../services/userProjectService');
const userProjectController = {
    createUserProject: async (req, res) => {
        const userProjectData = req.body;
        try {
            await createUserProject(userProjectData);
            res.status(200).json({ err: 0, msg: 'Tạo user project thành công!' });
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
    updateUserProject: async (req, res) => {
        const { userProjectId } = req.params;
        const userProjectData = req.body;
        try {
            await updateUserProject(userProjectId, userProjectData);
            res.status(200).json({ err: 0, msg: 'Cập nhật user project thành công!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteUserProject: async (req, res) => {
        const { userProjectId } = req.params;
        try {
            await deleteUserProject(userProjectId);
            res.status(200).json({ err: 200, msg: 'Xoá user project thành công!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = userProjectController;
