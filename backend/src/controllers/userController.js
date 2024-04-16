const { getUserById, updateUser } = require('../services/userService');
const userController = {
    getUserById: async (req, res) => {
        const { userId } = req.decoded;
        try {
            const results = await getUserById(userId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    updateUser: async (req, res) => {
        const { userId } = req.decoded;
        const userData = req.body;
        try {
            await updateUser(userId, userData);
            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = userController;
