const { createUser } = require('../services/userService');
const { encodePassword } = require('../utils/hashPassword');
const signUpController = {
    checkSignUp: async (req, res) => {
        const userData = req.body;
        try {
            const hashedPassword = encodePassword(req.body.password);
            await createUser({ ...userData, password: hashedPassword });
            res.status(200).json({ err: 0, msg: 'Signup successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1001, msg: error });
        }
    },
};
module.exports = signUpController;
