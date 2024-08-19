const router = require("express").Router();
const { regSignUp, login, getUser,getAllUsers} = require("../Controllers/user");
const AuthMiddleware = require("../middleware/auth")

router.route("/").post(regSignUp).get(AuthMiddleware,getAllUsers);
router.route("/login").post(login);
router.route("/getSelf").get(getUser);

module.exports = router;
