const route = require('express').Router();
const { body, validationResult } = require('express-validator');
const { checkSignIn } = require('../controllers/signInController');
const { checkSignInParameter } = require('../middlewares/authMiddleware');
// route.post('/', checkSignInParameter, checkSignIn);
route.post(
    '/',
    [
        body('username').isLength({ min: 1 }).withMessage('Username không được để trống'),
        body('password').exists(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        // Kiểm tra nếu username là chuỗi rỗng
        if (req.body.username.trim() === '') {
            return res.status(400).json({ errors: [{ msg: 'Username không được để trống' }] });
        }

        next();
    },
    checkSignIn
);

module.exports = route;
