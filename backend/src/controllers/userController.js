const { getAllUser, getUserById, updateUser, deleteUser } = require('../services/userService');
const userController = {
    getAllUser: async (req, res) => {
        try {
            const results = await getAllUser();
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const results = await getUserById(userId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { userId } = req.decoded;
            const userData = req.body;
            await updateUser(userId, userData);
            res.status(201).json({ err: 0, msg: 'Update user successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            await deleteUser(userId);
            res.status(201).json({ err: 0, msg: 'Delete user successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = userController;
