const checkCredentials = require("../middlewares/checkCredentials");
const Resource = require("../models/Resource");
const Widget = require("../models/Widget");

const router = require("express").Router();

//? create a widget
router.post("/", async (req, res) => {
    try {
        const newWidget = new Widget(req.body);
        const widget = await newWidget.save();
        return res.status(200).json({ status: "success", data: { widget } })
    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

//? get the value of a widget via resource
router.get('/:username/:id/:key', checkCredentials, async (req, res) => {
    try {
        const deviceResources = await Resource.findOne({ deviceId: req.device._id });

        const widgets = await Widget.find({ deviceId: req.device._id })

        widgets.forEach(widget => {
            if (deviceResources.resources[widget.resourceId - 1].name === req.body.name && deviceResources.resources[widget.resourceId - 1].pin === req.body.pin) {
                return res.status(200).json({ status: "success", data: { value: widget.value } })
            }
        })

        return res.status(404).json({ status: "fail", message: "value not found" })

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

module.exports = router;