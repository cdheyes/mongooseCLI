require("./db/connection");
const { default: mongoose } = require("mongoose");
const yargs = require("yargs");
const {
	// point to where the functions live
	addMovie,
	deleteMovie,
	listMovie,
	updateMovie,
	findMovie,
} = require("./movie/methods");

const app = async (yargsObj) => {
	try {
		if (yargsObj.add) {
			// call add movie function passing yargsObj terminal input
			await addMovie({ title: yargsObj.title, actor: yargsObj.actor });
			console.log(`${yargsObj.title} has been added`);
			//
		} else if (yargsObj.list) {
			// (calls the) list all movies function
			await listMovie();
			//
		} else if (yargsObj.update) {
			// calls the update movie func with query and update
			await updateMovie({ title: yargsObj.title, actor: yargsObj.actor });
			//
		} else if (yargsObj.delete) {
			// calls delete movie func with query from yargs cli
			await deleteMovie({ title: yargsObj.title });
			//
		} else if (yargsObj.find) {
			// calls a func to find if a movie is in the db or not
			await findMovie({ title: yargsObj.title });
			//
		} else {
			console.log("Incorrect command");
		}
		// list db after any operation for debug
		await listMovie();
		// and disconnect from db
		await mongoose.disconnect();
	} catch (error) {
		console.log(error);
		await mongoose.disconnect();
	}
};

// call app function with yargs cli input
app(yargs.argv);
