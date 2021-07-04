const express = require("express");
const router = express.Router();
const controller = require("../../controllers/registration.controller");

//======= Service Registration =======
router.post(
	"/register",
	controller.registration
);

//======= Consumer Services =======
router.get(
	"/consumer-services",
	controller.consumerSevices
);

module.exports = router;
