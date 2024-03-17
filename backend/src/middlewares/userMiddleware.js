const momentjs = require('moment');
const userMiddleware = {
    checkUserId: (req, res, next) => {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ err: -1000, msg: 'Missing user id parameter!' });
        next();
    },
    checkBodyParameter: (req, res, next) => {
        const { fullName, gender, birthday, email, numberPhone, username, password } = req.body;
        if (!fullName)
            return res.status(400).json({ err: -1001, msg: 'Missing fullname parameter!' });
        if (!gender) return res.status(400).json({ err: -1001, msg: 'Missing gender parameter!' });
        if (!birthday || !momentjs(birthday, 'YYYY-MM-DD', true).isValid())
            return res.status(400).json({
                err: -1001,
                msg: 'Missing birthday or incorrect birthday parameter!',
            });
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return res
                .status(400)
                .json({ err: -1001, msg: 'Missing email or incorrect email parameter!' });
        if (!numberPhone || !/^\d{10,11}$/.test(numberPhone) || numberPhone.includes(' '))
            return res.status(400).json({
                err: -1001,
                msg: 'Missing numberPhone or incorrect numberphone parameter!',
            });
        if (!username || username.includes(' '))
            return res.status(400).json({
                err: -1001,
                msg: 'Missing username parameter or username includes space!',
            });
        if (!password)
            return res.status(400).json({ err: -1001, msg: 'Missing password parameter!' });
        next();
    },
};
module.exports = userMiddleware;
