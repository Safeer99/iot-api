const checkCredentials = require("../middlewares/checkCredentials");
const Widget = require("../models/Widget");
const router = require("express").Router();

//? established connection
router.put("/:username/:id/:key", checkCredentials, async (req, res) => {
    try {
        const device = req.device;

        await device.updateOne({ status: req.body.status });

        return res.status(200).json({
            status: "success",
            message: req.body.status === "online" ? "connected" : "disconnected"
        });

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? get the value of a widget
router.get('/:username/:id/:key', checkCredentials, async (req, res) => {
    try {
        const widgets = await Widget.find({
            deviceId: req.device._id,
            resource: req.query?.name
        })

        if (widgets.length > 1)
            return res.status(404).json({ status: "fail", message: "There are multiple resource with same name" })

        return res.status(200).json({ status: "success", data: { value: widgets[0].value } })

    } catch (error) {
        return res.status(404).json({ status: "fail", messsage: error });
    }
})


module.exports = router;