const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		default: "anonymous",
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 9,
	},
	refreshToken: {
		type: String,
	},
	username: {
		type: String,
		unique: true,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	workouts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Workout",
		},
	],
	weights: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Weight",
		},
	],
	startingWeight: {
		type: Number,
		default: 0,
	},
	currentWeight: {
		type: Number,
		default: 0,
	},
	goalWeight: {
		type: Number,
		default: 0,
	},
	weeklyGoal: {
		type: String,
		enum: [
			"lose 0.5 lbs per week",
			"lose 1 lb per week",
			"lose 1.5 lbs per week",
			"lose 2 lbs per week",
			"maintain weight",
			"gain 0.5 lbs per week",
			"gain 1 lb per week",
		],
		default: "maintain weight",
	},
});

module.exports = mongoose.model("Users", userSchema);
