const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    },
    credentials: {
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
    ipAddress: {
        type: String,
        default: '0.0.0.0'
    },
    status: {
        type: String,
        default: "offline"
    },
    lastConnectionTime: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

module.exports = mongoose.model("Device", DeviceSchema);