const router = require("express").Router();
const {updateStream,CreateStream,getStream} = require("../Controllers/Stream")

router.route("/:id").post(CreateStream).patch(updateStream).get(getStream);

module.exports = router;