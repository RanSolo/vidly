const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
	"Customer",
	new mongoose.Schema({
		isGold: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
		},
		phone: {
			type: String,
			required: true,
			maxlength: 5,
			minlength: 50,
		},
	}),
);

const validateCustomer = (customer) => {
	const schema = {
		isGold: Joi.bool(),
		phone: Joi.string(),
		name: Joi.string().min(3).required(),
	};
	const result = Joi.validate(customer, schema);
	return result.error;
};

const handle404 = (customer, _id, res) => {
	if (!customer) res.status(404).send(`No customer id of ${_id} exists.`);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.handle404 = handle404;
