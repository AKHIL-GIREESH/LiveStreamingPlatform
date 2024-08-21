const router = require("express").Router();
const { regSignUp, login, getUser,getAllUsers,follow} = require("../Controllers/user");
const AuthMiddleware = require("../middleware/auth")

router.route("/").post(regSignUp).get(AuthMiddleware,getAllUsers);
router.route("/login").post(login);
router.route("/getSelf").get(getUser);
router.route("/follow/:id").patch(AuthMiddleware,follow)

module.exports = router;
