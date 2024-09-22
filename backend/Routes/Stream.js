const router = require("express").Router();
const {updateStream,CreateStream,getStream} = require("../Controllers/Stream")
const {createLiveKitStuff} = require("../Controllers/Livekitstuff")

router.route("/:id").post(CreateStream).patch(updateStream).get(getStream);
router.route("/:id/ingress").post(createLiveKitStuff)

module.exports = router;