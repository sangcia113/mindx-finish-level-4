const { body, validationResult } = require('express-validator');
const userMiddleware = {
    checkBodyParameter: [
        body('fullName')
            .isLength({ max: 50 })
            .withMessage('Fullname tối đa 50 ký tự!')
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage('Fullname chỉ được chứa ký tự!'),
        body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Giới tính không hợp lệ!'),
        body('dateOfBirth').isDate({ format: 'YYYY-MM-DD' }).withMessage('Ngày sinh không hợp lệ!'),
        body('email').isEmail().withMessage('Không đúng định dạng email!'),
        body('phoneNumber')
            .matches(/^\d{10,11}$/)
            .withMessage('Số điện thoại phải có 10 hoặc 11 ký tự!'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = userMiddleware;
