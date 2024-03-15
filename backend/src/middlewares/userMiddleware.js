const userMiddleware = {
    // viết rõ tên
    checkParams: (req, res, next) => {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ err: -1000, msg: 'Missing parameter' });
        next();
    },
    // viết rõ tên + switch case thông báo rõ
    checkBody: (req, res, next) => {
        const { fullName, gender, birthday, email, numberPhone, username, password } = req.body;
        if (!(fullName && gender && birthday && email && numberPhone && username && password))
            return res.status(400).json({ err: -1001, msg: 'Missing body' });
        next();
    },
};
module.exports = userMiddleware;
