const Device = require("../models/Device");
const User = require("../models/User");

const checkCredentials = async (req, res, next) => {
    try {
        const currentUser = await User.findOne({ username: req.params.username });
        if (!currentUser)
            return res.status(404).json({ status: "fail", message: "invalid data" });

        const currentDevice = await Device.findOne({ deviceId: req.params.id, userId: currentUser._id });
        if (!currentDevice)
            return res.status(404).json({ status: "fail", message: "invalid data" });

        if (currentDevice.credentials !== req.params.key)
            return res.status(404).json({ status: "fail", message: "invalid data" });

        req.user = currentUser;
        req.device = currentDevice;

        next();
    } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message })
    }
}

module.exports = checkCredentials;