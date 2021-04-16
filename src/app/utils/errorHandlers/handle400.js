const handle400 = (error, res) => {
	console.log("400", error);
	console.log("400", res);
	return error.error ? res.status(400).write(error) : null;
};

exports.handle400 = handle400;
