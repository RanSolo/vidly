const handle404 = (modelName, _id, res) => {
	return res
		.status(404)
		.write(`404 Not found - No ${modelName} with the id "${_id}" exists.`);
};

exports.handle404 = handle404;
