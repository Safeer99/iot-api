const Device = require("../models/Device");
const User = require("../models/User");
const checkCredentials = require("../middlewares/checkCredentials");
const Resource = require("../models/Resource");
const router = require("express").Router();

//? create a new device
router.post("/", async (req, res) => {
    try {
        const newDevice = new Device(req.body);
        const device = await newDevice.save();
        const newResources = new Resource({ deviceId: device._id });
        const resources = await newResources.save();
        return res.status(200).json({ status: "success", data: { device, resources } });
    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

//? get all the user devices
router.get("/:id", async (req, res) => {
    try {

        const currentUser = await User.findById(req.params.id);
        if (!currentUser) {
            return res.status(404).json({ status: "fail", message: "invalid data" });
        }

        const devices = await Device.find({ userId: currentUser._id });

        return res.status(200).json({ status: "success", data: { devices } });

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

//? get a single device
router.get("/device/:id", async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device)
            return res.status(404).json({ status: "fail", message: "invalid data" });

        return res.status(200).json({ status: "success", data: { device } });

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

//? delete a device
router.delete("/:id", async (req, res) => {
    try {

        const device = await Device.findById(req.params.id);

        if (!device)
            return res.status(404).json({ status: "fail", message: "invalid data" });

        const resources = await Resource.findOne({ deviceId: device._id });

        if (device.userId === req.body.userId) {
            await device.deleteOne();
            await resources.deleteOne();
            return res.status(200).json({ status: "success", message: "device deleted" });
        } else {
            return res.status(404).json({ status: "fail", message: "invalid data" });
        }

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

//? update status or connect to database
router.put("/:username/:id/:key", checkCredentials, async (req, res) => {
    try {
        const device = req.device;
        if (device.status === "online")
            await device.updateOne({ status: "offline" });
        else
            await device.updateOne({ status: "online" });

        const resources = await Resource.findOne({ deviceId: device._id });

        await resources.updateOne({ resources: [] });

        return res.status(200).json({ status: "success", message: device.status === "offline" ? "connected" : "disconnected" });

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})


module.exports = router;