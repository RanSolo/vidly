const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");

const helmet = require("helmet");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const home = require("./routes/home");
const logger = require("./middleware/logger");
const authenticator = require("./authenticator");
const { urlencoded } = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

mongoose
	.connect("mongodb://localhost/vidly", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.error("Could not connect to MongoDB...", err));

//configuration
app.set("view engine", "pug");
app.set("views", "./views");

console.log("Application Name: " + config.get("name"));
console.log("Mail: " + config.get("mail.host"));
console.log("Password: ", config.get("mail.password"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	debug("Morgan enabled");
}

app.use(helmet());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/", home);
app.use(logger);
app.use(authenticator);

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
