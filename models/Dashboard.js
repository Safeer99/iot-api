const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    dashboardId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    background: {
        type: String,
        default: "#fff"
    },
    columns: {
        type: Number,
        default: 6,
    },
    rowHeight: {
        type: Number,
        default: 50
    }
}, { timestamps: true })

module.exports = mongoose.model("Dashboard", DashboardSchema);