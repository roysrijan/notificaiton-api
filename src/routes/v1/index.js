const express = require("express");
const notificationRoute = require("./notification.route");
const registrationRoute = require("./registration.route");

const router = express.Router();

router.use("/notification", notificationRoute);

router.use("/registration", registrationRoute);

module.exports = router;