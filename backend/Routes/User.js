const router = require("express").Router();
const { regSignUp, login } = require("../Controllers/user");

router.route("/").post(regSignUp);
router.route("/login").post(login);

module.exports = router;
