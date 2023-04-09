const Widget = require("../models/Widget");
const router = require("express").Router();

//? create a widget
router.post("/", async (req, res) => {
    try {

        const widget = await Widget.create(req.body);

        return res.status(201).json({ status: "success", data: { widget } })

    } catch (error) {
        return res.status(400).json({ status: "fail", message: error });
    }
})

//? get all the widgets of a dashboard
router.get('/:id', async (req, res) => {
    try {
        const widgets = await Widget.find({ dashboardId: req.params.id });

        return res.status(200).json({ status: "success", results: widgets.length, data: { widgets } })
    } catch (error) {
        return res.status(404).json({ status: "fail", message: error })
    }
})

//? update the widget
router.patch('/:id', async (req, res) => {
    try {
        const widget = await Widget.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        return res.status(200).json({ status: "success", data: { widget } });

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? update the value of all the similar widgets
router.patch('/value/:id', async (req, res) => {
    try {
        const widget = await Widget.findById(req.params.id);

        const widgets = await Widget.updateMany(
            { deviceId: widget.deviceId, resource: widget.resource },
            { value: [req.body.value] }
        )

        return res.status(200).json({ status: "success", message: "value updated successfully", data: { widgets } })

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? delete the widget
router.delete('/:id', async (req, res) => {
    try {
        await Widget.findByIdAndDelete(req.params.id);

        return res.status(204).json({ status: "success", message: "widget deleted" });
    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

module.exports = router;