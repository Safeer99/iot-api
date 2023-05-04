const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const fetchUser = require("../middlewares/fetchUser");

router.post("/register", async (req, res) => {
    try {
        const salt = process.env.SECRET_KEY;
        var encryptedPassword = CryptoJS.AES.encrypt(req.body.password, salt).toString();

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword
        })

        const user = await newUser.save();

        const data = {
            user: {
                id: user._id,
                name: user.username
            }
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        return res.status(201).json({ status: "success", data: { token: authToken } });

    } catch (error) {
        return res.status(400).json({ status: "fail", message: error });
    }
})

router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });

        const salt = process.env.SECRET_KEY;
        var bytes = CryptoJS.AES.decrypt(user.password, salt);
        var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== req.body.password) {
            return res.status(404).json({ status: "fail", message: "invalid email or password" });
        }

        const data = {
            user: {
                id: user._id,
                name: user.username
            }
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET)

        return res.status(200).json({ status: "success", data: { token: authToken } });

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

router.post('/getuser', fetchUser, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password -__v -updatedAt -_id")

        return res.status(200).json({ status: "success", data: { user } })

    } catch (error) {
        return res.status(404).json({ status: "fail", message: error });
    }
})

module.exports = router;