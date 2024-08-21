const router = require("express").Router();
const { regSignUp, login, getUser,getAllUsers,follow, unfollow} = require("../Controllers/user");
const AuthMiddleware = require("../middleware/auth")

router.route("/").post(regSignUp).get(AuthMiddleware,getAllUsers);
router.route("/login").post(login);
router.route("/getSelf").get(getUser);
router.route("/follow/:id").patch(AuthMiddleware,follow)
router.route("/unfollow/:id").patch(AuthMiddleware,unfollow)

module.exports = router;
