const router = require("express").Router();
const { regSignUp, login, getUser,getAllUsers} = require("../Controllers/user");

router.route("/").post(regSignUp).get(getAllUsers);
router.route("/login").post(login);
router.route("/getSelf").get(getUser);

module.exports = router;
