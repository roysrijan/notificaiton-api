const mongoose = require("mongoose");

const MessagesSchema = mongoose.Schema(
	{
        message: {
			type: String,
			required: true,
		},
		ID: {
			type: String,
			required: true,
			index: true,
		},
		SID: {
			type: String,
			required: true,
			index: true,
		},

    }
);

const Messages = mongoose.model("message", MessagesSchema);

module.exports = Messages;