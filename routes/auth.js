const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");

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
        res.status(200).json({ status: "success", data: { user } });

    } catch (error) {
        res.status(500).json({ status: "fail", error });
    }
})

router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ status: "fail", message: "invalid email or password" });
        }

        const salt = process.env.SECRET_KEY;
        var bytes = CryptoJS.AES.decrypt(user.password, salt);
        var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== req.body.password) {
            return res.status(404).json({ status: "fail", message: "invalid email or password" });
        }

        res.status(200).json({ status: "success", data: { user } });

    } catch (error) {
        res.status(500).json({ status: "fail", error });
    }
})

module.exports = router;