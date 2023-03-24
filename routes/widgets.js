const checkCredentials = require("../middlewares/checkCredentials");
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

//? update the value of a widget
router.put('/:id', async (req, res) => {
    try {
        const widget = await Widget.findById(req.params.id);

        if (!widget)
            return res.status(404).json({ status: "fail", message: "No widget found" });

        await widget.updateOne({ value: req.body.value });

        return res.status(200).json({ status: "success", message: "value updated" });

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
            if (widget.resourceName === req.body.name) {
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