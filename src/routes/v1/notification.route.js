const express = require("express");
const router = express.Router();
const controller = require("../../controllers/notification.controller");

//======= Send Notification =======
router.post(
	"/send-notification",
	controller.sendNotification
);

//======= Show Notification =======
router.get(
	"/history",
	controller.historyNotification
);

module.exports = router;
