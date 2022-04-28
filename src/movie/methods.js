const Movie = require("./model");

exports.addMovie = async (movieObj) => {
	try {
		await Movie.create(movieObj);
	} catch (error) {
		console.log(error);
	}
};

exports.deleteMovie = async (movieObj) => {
	try {
		await Movie.deleteOne(movieObj);
	} catch (error) {
		console.log(error);
	}
};

exports.listMovie = async (movieObj) => {
	try {
		const movieList = await Movie.find({});
		console.log(movieList);
	} catch (error) {
		console.log(error);
	}
};

exports.updateMovie = async (movieObj) => {
	try {
		await Movie.updateOne(
			{ title: movieObj.title }, //find movie to update
			{ actor: movieObj.actor } //update to be made
		);
	} catch (error) {
		console.log(error);
	}
};

exports.findMovie = async (movieObj) => {
	try {
		const movieFind = await Movie.findOne(movieObj);
		if (movieFind) {
			console.log(movieFind);
		} else {
			console.log("Movie not in database");
		}
	} catch (error) {
		console.log(error);
	}
};
