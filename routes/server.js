const checkCredentials = require("../middlewares/checkCredentials");
const Widget = require("../models/Widget");
const router = require("express").Router();

//? established connection
router.put("/:username/:id/:key", checkCredentials, async (req, res) => {
    try {

        if (req.query?.status !== "online" && req.query?.status !== "offline")
            return res.status(404).json({ status: "fail", message: "Invalid" })

        const device = req.device;

        await device.updateOne({ status: req.query?.status });

        return res.status(200).json({
            status: "success",
            message: req.query?.status === "online" ? "connected" : "disconnected"
        });

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? get value from the device and update on database
router.put("/input/:username/:id/:key", checkCredentials, async (req, res) => {
    try {
        if (req.device.status === "offline")
            return res.status(404).json({ status: "fail", message: "Device is currently offline" })

        const widgets = await Widget.find({
            deviceId: req.device._id,
            resource: req.query?.name
        })

        if (widgets.length > 1)
            return res.status(404).json({ status: "fail", message: "There are multiple resource with same name" })

        await widgets[0].updateOne({
            $push: { value: req.body.value }
        })

        return res.status(200).json({ status: "success", message: "Value updated" })

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? get the value of a widget
router.get('/output/:username/:id/:key', checkCredentials, async (req, res) => {
    try {
        if (req.device.status === "offline")
            return res.status(404).json({ status: "fail", message: "Device is currently offline" })

        const widgets = await Widget.find({
            deviceId: req.device._id,
            resource: req.query?.name
        })

        if (widgets.length > 1)
            return res.status(404).json({ status: "fail", message: "There are multiple resource with same name" })

        return res.status(200).json({ status: "success", data: { value: widgets[0].value[0] } })

    } catch (error) {
        return res.status(404).json({ status: "fail", messsage: error });
    }
})


module.exports = router;