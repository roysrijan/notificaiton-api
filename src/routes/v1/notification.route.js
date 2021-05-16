const express = require("express");
const router = express.Router();
const controller = require("../../controllers/notification.controller");

//======= Send Notification =======
router.post(
	"/send-notification",
	controller.sendNotification
);

module.exports = router;
