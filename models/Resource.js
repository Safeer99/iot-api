const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
    deviceId: { type: String, required: true },
    resources: { type: Array, default: [] },
}, { timestamps: true })

module.exports = mongoose.model("Resource", ResourceSchema);