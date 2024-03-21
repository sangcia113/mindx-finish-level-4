require('dotenv').config();
const { body, validationResult } = require('express-validator');
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
    checkSignParameter: [
        body('username')
            .isLength({ min: 6, max: 20 })
            .withMessage('Username phải có độ dài từ 6 đến 20 ký tự')
            .custom(value => !/\s/.test(value))
            .withMessage('Username không được chứa khoảng trắng')
            .custom(value => /^[a-zA-Z0-9]*$/.test(value))
            .withMessage('Username không được chứa ký tự đặc biệt!')
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage('Username chỉ được chứa ký tự và số'),
        body('password')
            .isLength({ min: 6, max: 30 })
            .withMessage('Password phải có độ dài từ 6 đến 30 ký tự')
            .custom(value => !/\s/.test(value))
            .withMessage('Password không được chứa khoảng trắng'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = authMiddleware;
