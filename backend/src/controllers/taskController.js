const {
    createTask,
    getTaskById,
    getTaskByQuery,
    updateTask,
    deleteTask,
} = require('../services/taskService');
const taskController = {
    createTask: async (req, res) => {
        const taskData = req.body;
        try {
            await createTask(taskData);
            res.status(200).json({ err: 0, msg: 'Thêm task thành công!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getTaskById: async (req, res) => {
        const { taskId } = req.params;
        try {
            const results = await getTaskById(taskId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
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
    updateTask: async (req, res) => {
        const { taskId } = req.params;
        const taskData = req.body;
        try {
            await updateTask(taskId, taskData);
            res.status(200).json({ err: 0, msg: 'Cập nhật task thành công!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteTask: async (req, res) => {
        const { taskId } = req.params;
        try {
            await deleteTask(taskId);
            res.status(200).json({ err: 0, msg: 'Xoá task thành công!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = taskController;
