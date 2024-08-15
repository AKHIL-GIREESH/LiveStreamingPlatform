const router = require("express").Router();
const { regSignUp, login, getUser } = require("../Controllers/user");

router.route("/").post(regSignUp);
router.route("/login").post(login);
router.route("/getSelf").get(getUser);

module.exports = router;
