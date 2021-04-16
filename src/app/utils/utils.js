const { handle400, handle404 } = require("./errorHandlers/handlers");
const { getGenre, getCustomer, getMovie } = require("./getters/getters");
const { isEmailUnique } = require("./validators/validators");

exports.handle400 = handle400;
exports.handle404 = handle404;
exports.getGenre = getGenre;
exports.getCustomer = getCustomer;
exports.getMovie = getMovie;
exports.isEmailUnique = isEmailUnique;
