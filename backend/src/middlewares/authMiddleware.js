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
};
module.exports = authMiddleware;
