const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
	registrationService,
} = require("../services");


//======= Service Registration =======
exports.registration = catchAsync(async (req, res) => {
	//let userId = req.decoded.sub;
	let body = req.body;
	const newRegistration = await registrationService.registration(body);
	res.status(httpStatus.CREATED).send({
		staus: 'OK',
		data: newRegistration,
	});
});


//======= Consumer Services =======
exports.consumerSevices = catchAsync(async (req, res) => {
	//let userId = req.decoded.sub;
	let body = req.body;
	const newRegistration = await registrationService.consumerServices();
	res.status(httpStatus.CREATED).send({
		staus: 'OK',
		data: newRegistration,
	});
});
