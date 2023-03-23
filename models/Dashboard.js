const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    dashboardId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("Dashboard", DashboardSchema);