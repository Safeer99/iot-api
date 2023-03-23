const mongoose = require("mongoose");

const WidgetSchema = new mongoose.Schema({
    dashboardId: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: String, default: "" },
    deviceId: { type: String, required: true },
    resourceId: { type: Number, required: true },
}, { timestamps: true })

module.exports = mongoose.model("Widget", WidgetSchema);