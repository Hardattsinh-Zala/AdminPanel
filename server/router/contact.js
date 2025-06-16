const express = require("express");
const router = express.Router();
const contact = require("../controllers/contact-controller.js");
const validators = require("../validators/validator.js");
const validate = require("../middlewares/validate-func.js");

router.route("/contact").get((req, res) => {
    res.send("Contact form is active.");
}).post(validate(validators.contactSchema), contact);

module.exports = router;