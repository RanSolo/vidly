const { Genre } = require("../../models/genre");
const { handle404 } = require("../errorHandlers/handle404");

const getGenre = (genreId, res) => {
	return Genre.findById(genreId, function (error, genre) {
		if (!genre) return handle404("genre", genreId, res);
		if (error) return handle400(error, res);
		if (error && genre) res.send(error);
	});
};

exports.getGenre = getGenre;
