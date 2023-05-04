const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token)
            return res.status(404).json({ status: "fail", message: "Invalid" })

        const data = jwt.verify(token, process.env.JWT_SECRET)

        req.user = data.user;
        next();
    } catch (error) {
        return res.status(404).json({ status: "fail", message: error })
    }
}

module.exports = fetchUser;