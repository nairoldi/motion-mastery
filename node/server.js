const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());

const PORT = process.env.SERVER_PORT || 3001;

// routers
const Login = require("./login/loginRoutes").LoginRouter;
const User = require('./user/userRoutes').UserRouter;

// test entry point
app.get("/api", (req, res, next) => {
	console.log("your in /api");
	res.send("you made it");
	next();
});

app.use("", (req, res, next) => {
	//res.header("Access-Control-Allow-Origin", "true");
	next();
});

// mount routers
app.use("/login", Login);
app.use('/user', User);


app.listen(PORT, async () => {
	console.log(`Running on port ${PORT}`);
	connect_mongo();
});

async function connect_mongo() {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("we have connected to mongo!!");
	} catch (error) {
		//console.log("connection failed");
		console.log(error.message);
	}
}

module.exports = app;
