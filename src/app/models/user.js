const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		email: {
			type: String,
			unique: true,
			required: true,
			minlength: 5,
			maxlength: 255,
		},
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 1024,
		},
	}),
);

const validateUser = (user) => {
	const schema = Joi.object({
		password: Joi.string().min(5).max(255).required(),
		email: Joi.string().min(5).max(255).required().email(),
		name: Joi.string().min(5).required(),
	});
	const result = schema.validate(user);

	if (!result.error) result.error = {};
	return result.error;
};

exports.User = User;
exports.validate = validateUser;
