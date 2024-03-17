require('dotenv').config();
const jwt = require('jsonwebtoken');
const authMiddleware = {
    verifyToken: async (req, res, next) => {
        const accessToken = req.headers.authorization?.split(' ').pop();
        if (!accessToken) return res.status(400).json({ error: -1001, message: 'Missing token!' });
        jwt.verify(accessToken, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err)
                return res.status(400).json({ error: -1002, message: 'Access token not verify!' });
            req.decoded = decoded;
            next();
        });
    },
    checkSignUpParameter: async (req, res, next) => {
        const { username, password, confirmPassword } = req.body;
        if (!username || username.includes(' '))
            return res
                .status(400)
                .json({ err: -1000, msg: 'Missing username or username parameter include space!' });
        if (!password)
            return res.status(400).json({ err: -1000, msg: 'Missing password parameter!' });
        if (!confirmPassword)
            return res.status(400).json({ err: -1000, msg: 'Missing confirm password parameter!' });
        if (password !== confirmPassword)
            return res
                .status(400)
                .json({ err: -1002, msg: 'Password and confirm password dont match!' });
        next();
    },
    checkSignInParameter: async (req, res, next) => {
        const { username, password } = req.body;
        if (!username)
            return res.status(400).json({ err: -1000, msg: 'Missing username parameter!' });
        if (!password)
            return res.status(400).json({ err: -1000, msg: 'Missing password parameter!' });
        next();
    },
};
module.exports = authMiddleware;
