const {
    createTaskUser,
    getTaskUserById,
    updateTaskUser,
    deleteTaskUser,
    getUserNotInTask,
    getTaskUserByQuery,
} = require('../services/taskUserService');

const taskUserController = {
    // ok
    createTaskUser: async (req, res) => {
        const taskUserData = req.body;

        try {
            await createTaskUser(taskUserData);

            res.status(200).json({ err: 0, msg: 'Add successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    getTaskUserById: async (req, res) => {
        const { taskUserId } = req.params;
        try {
            const results = await getTaskUserById(taskUserId);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    getUserNotInTask: async (req, res) => {
        const { taskId } = req.params;

        try {
            const results = await getUserNotInTask(taskId);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    getTaskUserByQuery: async (req, res) => {
        const { taskId, userId } = req.query;
        const query = {};
        if (taskId) query.taskId = taskId;
        if (userId) query.userId = userId;

        try {
            const results = await getTaskUserByQuery(query);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    updateTaskUser: async (req, res) => {
        const { taskUserId } = req.params;
        const taskUserData = req.body;

        try {
            await updateTaskUser(taskUserId, taskUserData);

            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    deleteTaskUser: async (req, res) => {
        const { taskUserId } = req.params;

        try {
            await deleteTaskUser(taskUserId);

            res.status(200).json({ err: 0, msg: 'Delete successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = taskUserController;
