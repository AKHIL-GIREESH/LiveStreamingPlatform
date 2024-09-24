const router = require("express").Router();
const {webhook,rawBodyMiddleware} = require("../Controllers/Webhook")

router.route("/").post(rawBodyMiddleware,webhook)

module.exports = router;