const { Movie } = require("../../models/movie");
const utils = require("../utils");

const getMovie = (movieId, res) => {
	return Movie.findById(movieId, async function (error, movie) {
		if (!movie) utils.handle404("movie", movieId, res);
		if (movie.numberInStock === 0)
			return res.status(400).send(`${movie} Not In Stock `);

		const genre = await utils.getGenre(movie.genre.id, res);

		if (!genre) {
			console.error("orphaned genre");
			res.send("orphaned genre");
		}
		movie.genre = genre;
		if (error && movie) res.send(error);
	});
};

exports.getMovie = getMovie;
