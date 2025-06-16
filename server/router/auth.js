const express = require("express");
const router = express.Router();
const homePage = require("../controllers/auth-controller.js");
const validators = require("../validators/validator.js");
const validate = require("../middlewares/validate-func.js");
const authFunction = require("../middlewares/auth-func.js");

router.route("/").get(homePage.home);

router.route("/register").get((req, res) => {
    res.send("Registeration page active");
}).post(validate(validators.signupSchema) ,homePage.register);

router.route("/login").get((req, res) => {
    res.send("Login page active");
}).post(validate(validators.loginSchema), homePage.login);

router.route("/user").get(authFunction, homePage.user);

module.exports = router;