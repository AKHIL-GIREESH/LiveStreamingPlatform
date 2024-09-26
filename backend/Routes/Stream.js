const router = require("express").Router();
const {updateStream,CreateStream,getStream} = require("../Controllers/Stream")
const {createLiveKitStuff} = require("../Controllers/Livekitstuff");
const AuthMiddleware = require("../middleware/auth");
const createViewerToken = require("../Controllers/token")
const tokenMiddleWare = require("../middleware/authForToken")

router.route("/:id").post(CreateStream).patch(updateStream).get(getStream);
router.route("/:id/ingress").patch(AuthMiddleware,createLiveKitStuff)
router.route("/viewerToken/:id").get(tokenMiddleWare,createViewerToken)

module.exports = router;