require('dotenv').config();
const { getUserByUsername } = require('../services/userService');
const { decodePassword } = require('../utils/hashPassword');
const loginController = {
    authLogin: async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ err: -1000, msg: 'Missing username or password!' });
        try {
            const results = await getUserByUsername(username);
            if (!results.length)
                return res.status(400).json({ err: -1000, msg: 'Username not found!' });
            if (!decodePassword(password, results[0].password))
                return res.status(400).json({ err: -1000, msg: 'Incorrect password!' });
            const payload = {
                userId: results[0]._id,
                fullname: results[0].fullName,
            };
            const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY);
            res.status(200).json({ err: 0, msg: 'Login successfully!', accessToken });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = loginController;
