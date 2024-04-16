require('dotenv').config();
const { getUserByUsername } = require('../services/userService');
const { decodePassword } = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');
const signIncontroller = {
    checkSignIn: async (req, res) => {
        const { username, password } = req.body;
        try {
            const results = await getUserByUsername(username);
            if (!results) return res.status(400).json({ err: -1000, msg: 'User not found!' });
            if (!decodePassword(password, results.password))
                return res.status(400).json({ err: -1000, msg: 'Password incorrect!' });
            const payload = {
                userId: results._id,
                fullname: results.fullName,
            };
            const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '12h' });
            res.status(200).json({ err: 0, msg: 'Signin successfully!', accessToken });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = signIncontroller;
// bo sung RT
