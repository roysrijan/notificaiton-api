const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
	notificationService,
} = require("../services");


//======= Send Notification =======
exports.sendNotification = catchAsync(async (req, res) => {
	//let userId = req.decoded.sub;
	let body = req.body;
	const newNotification = await notificationService.sendNotification(body);
	res.status(httpStatus.CREATED).send({
		staus: 'OK',
		data: newNotification,
	});
});
