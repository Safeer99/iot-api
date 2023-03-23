const Dashboard = require("../models/Dashboard");
const router = require("express").Router();

//? create a new dashboard
router.post("/", async (req, res) => {
    try {
        const newDashboard = new Dashboard(req.body);
        const dashboard = await newDashboard.save();

        return res.status(200).json({ status: "success", data: { dashboard } })
    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

//? get all the user dashboards
router.get("/:id", async (req, res) => {
    try {

        const currentUser = await User.findById(req.params.id);
        if (!currentUser) {
            return res.status(404).json({ status: "fail", message: "invalid data" });
        }

        const userDashboards = await Dashboard.find({ userId: currentUser._id });

        return res.status(200).json({ status: "success", data: { dashboards: userDashboards } });

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

//? delete a dashboard
router.delete("/:id", async (req, res) => {
    try {

        const dashboard = await Dashboard.findById(req.params.id);

        if (!dashboard)
            return res.status(404).json({ status: "fail", message: "invalid data" });

        if (dashboard.userId === req.body.userId) {
            await dashboard.deleteOne();
            return res.status(200).json({ status: "success", message: "dashboard deleted" });
        } else {
            return res.status(404).json({ status: "fail", message: "invalid data" });
        }

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

module.exports = router;