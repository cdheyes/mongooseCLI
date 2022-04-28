require("./db/connection");
const { default: mongoose } = require("mongoose");
const yargs = require("yargs");
const {
	addMovie,
	deleteMovie,
	listMovie,
	updateMovie,
	findMovie,
} = require("./movie/methods");

const app = async (yargsObj) => {
	try {
		if (yargsObj.add) {
			// add movie function that takes yargsObj terminal input
			await addMovie({ title: yargsObj.title, actor: yargsObj.actor });
			console.log(`${yargsObj.title} has been added`);
		} else if (yargsObj.list) {
			// list movies from database
			await listMovie();
		} else if (yargsObj.update) {
			// update movies with filterObj and updateObj
			await updateMovie({ title: yargsObj.title, actor: yargsObj.actor });
		} else if (yargsObj.delete) {
			// delete movies with filterObj
			await deleteMovie({ title: yargsObj.title });
		} else if (yargsObj.find) {
			// find if movie is in the db
			await findMovie({ title: yargsObj.title });
		} else {
			console.log("Incorrect command");
		}
		// list after any operation for debug
		await listMovie();
		// and disconnect from db
		await mongoose.disconnect();
	} catch (error) {
		console.log(error);
		await mongoose.disconnect();
	}
};

app(yargs.argv);
