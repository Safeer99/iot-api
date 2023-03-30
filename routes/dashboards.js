const Dashboard = require("../models/Dashboard");
const User = require("../models/User");
const router = require("express").Router();

//? create a new dashboard
router.post("/", async (req, res) => {
    try {
        const dashboard = await Dashboard.create(req.body);

        return res.status(201).json({ status: "success", data: { dashboard } })
    } catch (error) {
        return res.status(400).json({ status: "fail", message: error });
    }
})

//? get all the user dashboards
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const dashboards = await Dashboard.find({ userId: user._id });

        return res.status(200).json({ status: "success", data: { dashboards } });

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? get a single dashboard
router.get("/dashboard/:id", async (req, res) => {
    try {
        const dashboard = await Dashboard.findById(req.params.id);

        return res.status(200).json({ status: "success", data: { dashboard } });
    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

//? update a dashboard
router.patch("/:id", async (req, res) => {
    try {

        const dashboard = await Dashboard.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        return res.status(200).json({ status: "success", data: { dashboard } })

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error })
    }
})

//? delete a dashboard
router.delete("/", async (req, res) => {
    try {

        await Dashboard.deleteMany({ _id: { $in: req.body.list } });

        return res.status(204).json({ status: "success", message: "dashboard deleted" });

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

module.exports = router;