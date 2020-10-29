const handle404 = (modelName, _id, res) => {
	res.status(404).send(
		`404 Not found - No ${modelName} with the id "${_id}" exists.`,
	);
};

exports.handle404 = handle404;
