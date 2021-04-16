const { User } = require("../../models/user");

const isEmailUnique = async (email) => {
	isUnique = true;
	await User.findOne({ email }, (e, dupe) => {
		if (dupe) isUnique = false;
	});
	return isUnique;
};
exports.isEmailUnique = isEmailUnique;
