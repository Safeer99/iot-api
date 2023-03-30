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
        return res.status(500).json({ status: "fail", error });
    }
})

//? get the value of a widget
router.get('/:username/:id/:key', checkCredentials, async (req, res) => {
    try {
        const widgets = await Widget.find({ deviceId: req.device._id })

        let value = null;

        widgets.forEach(widget => {
            if (widget.resource === req.body.name) {
                value = widget.value;
            }
        })

        if (value !== null) return res.status(200).json({ status: "success", data: { value } })
        else return res.status(404).json({ status: "fail", message: "value not found" })

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})


module.exports = router;