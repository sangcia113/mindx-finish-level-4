const {
    createTask,
    getTaskById,
    getTaskByQuery,
    updateTask,
    deleteTask,
    updateTaskStatus,
} = require('../services/taskService');
const taskController = {
    // ok
    createTask: async (req, res) => {
        const { userId } = req.decoded;
        const taskData = req.body;

        try {
            await createTask({ ...taskData, taskCode: Date.now(), createdBy: userId });

            res.status(200).json({ err: 0, msg: 'Add successfully!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    getTaskById: async (req, res) => {
        const { taskId } = req.params;

        try {
            const results = await getTaskById(taskId);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    getTaskByQuery: async (req, res) => {
        const {
            stageId,
            code,
            name,
            type,
            priority,
            startDate,
            deadline,
            dueDate,
            status,
            createdBy,
            assignedTo,
        } = req.query;
        const query = {};
        if (stageId) query.stageId = stageId;
        if (code) query.code = code;
        if (name) query.name = name;
        if (type) query.type = type;
        if (priority) query.priority = priority;
        if (startDate) query.startDate = { $lte: new Date(startDate) };
        if (deadline) query.deadline = { $gte: new Date(deadline) };
        if (dueDate) query.dueDate = { $gte: new Date(dueDate) };
        if (status) query.status = status;
        if (createdBy) query.createdBy = createdBy;
        if (assignedTo) query.assignedTo = assignedTo;
        try {
            const results = await getTaskByQuery(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    updateTask: async (req, res) => {
        const { taskId } = req.params;
        const taskData = req.body;

        try {
            await updateTask(taskId, taskData);

            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    // ok
    updateTaskStatus: async (req, res) => {
        const { taskId } = req.params;
        const { status } = req.body;

        try {
            await updateTaskStatus(taskId, status);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    deleteTask: async (req, res) => {
        const { taskId } = req.params;
        try {
            await deleteTask(taskId);
            res.status(200).json({ err: 0, msg: 'Delete successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = taskController;
