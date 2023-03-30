const Device = require("../models/Device");
const User = require("../models/User");

const checkCredentials = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        const device = await Device.findOne({ deviceId: req.params.id, userId: user._id });

        if (device.credentials !== req.params.key)
            return res.status(404).json({ status: "fail", message: "invalid data" });

        req.user = user;
        req.device = device;

        next();
    } catch (error) {
        return res.status(404).json({ status: "fail", message: error })
    }
}

module.exports = checkCredentials;