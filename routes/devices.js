const Device = require("../models/Device");
const User = require("../models/User");
const router = require("express").Router();

//? create a new device
router.post("/", async (req, res) => {
    try {
        const device = await Device.create(req.body);
        return res.status(201).json({ status: "success", data: { device } });
    } catch (error) {
        return res.status(400).json({ status: "fail", message: error });
    }
})

//? get all the user devices
router.get("/:id", async (req, res) => {
    try {

        const currentUser = await User.findById(req.params.id);

        const devices = await Device.find({ userId: currentUser._id });

        return res.status(200).json({ status: "success", results: devices.length, data: { devices } });

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? get a single device
router.get("/device/:id", async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);

        return res.status(200).json({ status: "success", data: { device } });

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? update a device
router.patch("/:id", async (req, res) => {
    try {
        const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        return res.status(200).json({ status: "success", data: { device } })

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? delete a device
router.delete("/", async (req, res) => {
    try {

        await Device.deleteMany({ _id: { $in: req.body.list } });

        return res.status(204).json({ status: "success", message: "Device deleted" });

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

module.exports = router;