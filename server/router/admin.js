const express = require("express");
const router = express.Router();
const get = require("../controllers/admin-controller");
const authFunction = require("../middlewares/auth-func");
const adminFunction = require("../middlewares/admin-func");
const validators = require("../validators/validator");
const validate = require("../middlewares/validate-func");

router.route("/").get(authFunction, (req, res) => {
    res.send("This is admin Home.");
});

router.route("/user").get(authFunction, adminFunction, get.getUser);

router.route("/contact").get(authFunction, adminFunction, get.getContact);
router.route("/user/delete/:id").delete(authFunction, adminFunction, get.deleteUserById);
router.route("/contact/delete/:id").delete(authFunction, adminFunction, get.deleteContactById);


router.route("/user/edit/:id").get(authFunction, adminFunction, get.getUserById).patch(authFunction, adminFunction, get.editUser);
router.route("/contact/edit/:id").get(authFunction, adminFunction, get.getContactById).patch(authFunction, adminFunction, get.editContact);

module.exports = router;