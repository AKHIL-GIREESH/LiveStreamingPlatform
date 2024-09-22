const router = require("express").Router();
const {updateStream,CreateStream,getStream} = require("../Controllers/Stream")
const {createLiveKitStuff} = require("../Controllers/Livekitstuff");
const AuthMiddleware = require("../middleware/auth");

router.route("/:id").post(CreateStream).patch(updateStream).get(getStream);
router.route("/:id/ingress").patch(AuthMiddleware,createLiveKitStuff)

module.exports = router;