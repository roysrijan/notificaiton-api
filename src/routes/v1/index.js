const express = require("express");
const notificationRoute = require("./notification.route");

const router = express.Router();

router.use("/notification", notificationRoute);

module.exports = router;