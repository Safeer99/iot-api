const checkCredentials = require("../middlewares/checkCredentials");
const Device = require("../models/Device");
const Resource = require("../models/Resource");

const router = require("express").Router();

//? Create a resource
router.put('/:username/:id/:key', checkCredentials, async (req, res) => {
    try {
        const resource = await Resource.findOne({ deviceId: req.device._id });
        await resource.updateOne({
            $push: {
                resources: {
                    id: resource.resources.length + 1,
                    name: req.body.name,
                    pin: req.body.pin
                }
            }
        })

        return res.status(200).json({ status: "success", message: "resource added" })

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

//? get all resources of a device
router.get('/:id', async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device)
            return res.status(404), json({ status: "fail", message: "device not found" });

        const deviceResources = await Resource.findOne({ deviceId: device._id });

        return res.status(200).json({ status: "success", data: { resources: deviceResources.resources } })

    } catch (error) {
        return res.status(500).json({ status: "fail", error });
    }
})

module.exports = router;