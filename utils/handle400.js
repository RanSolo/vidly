const handle400 = (error, res) => {
	return error ? res.status(400).send(error.details) : null;
};

exports.handle400 = handle400;
