const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//Create Route
const router = express.Router();

//Routes
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    User.create(req.body, (err, user) => {
        res.redirect("/user/login")
    })
})

//Login routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (!user) {
            res.send("User does not exist");
        } else {
            const result = bcrypt.compareSync(password, user.password);
            if (result) {
                req.session.username = username
                req.session.loggedIn = true
                res.redirect("/spooktober");
            } else {
                res.send("Wrong Password");
            }
        }
    });
});

//Logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    });
});

//Export the router 
module.exports = router