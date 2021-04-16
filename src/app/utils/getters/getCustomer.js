const { Customer } = require("../../models/customer");
const { handle404 } = require("../errorHandlers/handle404");

const getCustomer = (customerId, res) => {
	return Customer.findById(customerId, function (error, customer) {
		if (!customer) handle404("customer", customerId, res);
		if (error && customer) res.send(error);
	});
};

exports.getCustomer = getCustomer;
