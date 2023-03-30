const mongoose = require("mongoose");

const WidgetSchema = new mongoose.Schema({
    dashboardId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        default: 0
    },
    background: {
        type: String,
        default: "#fff"
    },
    color: {
        type: String,
        default: "#000"
    },
    deviceId: {
        type: String,
        required: true
    },
    resource: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Widget", WidgetSchema);