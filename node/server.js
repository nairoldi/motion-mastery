const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PreExistingMotion = require("./preloadMotions/preloadMotionsSchema");
const motionsData = require("./preloadMotions/preloadMotions.json");
const ValidateToken = require("./util/util").ValidateToken;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use((req, res, next) => {
	console.log("Cookies:", req.cookies);
	next();
});

const PORT = process.env.SERVER_PORT || 3001;

// routers
const Login = require("./login/loginRoutes").LoginRouter;
const Auth = require("./auth/authRoutes").AuthRouter;
const User = require("./user/userRoutes").UserRouter;

// test entry point
app.get("/api", (req, res, next) => {
	console.log("your in /api");
	res.send("you made it");
	next();
});

app.use((req, res, next) => {
	console.log("req path:", req.path);
	next();
});

// routes
app.use("/login", Login);
app.use("/auth", Auth);
//app.use(ValidateToken);
app.use("/user", User);

app.listen(PORT, async () => {
	console.log(`Running on port ${PORT}`);
	connect_mongo();
	preloadData();
});

async function connect_mongo() {
	try {
		console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
		if (process.env.NODE_ENV !== "test") {
			await mongoose.connect(process.env.MONGO_URL);
			console.log("we are on main db");
		} else {
			await mongoose.connect(process.env.MONGO_TEST_URL);
		}
		console.log("we have connected to mongo!!");
	} catch (error) {
		//console.log("connection failed");
		console.log(error.message);
	}
}

async function preloadData() {
	try {
		// Loop through each motion in the JSON file
		for (const motionData of motionsData) {
			const { name, primaryMuscle, secondaryMuscle } = motionData;

			// Create a new motion document
			const motion = new PreExistingMotion({
				name,
				primaryMuscle,
				secondaryMuscle,
			});

			// Save the motion to the database
			await motion.save();
		}

		//console.log("Preloaded data successfully!");
		//mongoose.disconnect();
	} catch (error) {
		console.error("Error preloading data:", error);
		//mongoose.disconnect();
	}
}

module.exports = {
	app,
};
