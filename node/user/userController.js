// this will be things the user can get their workouts summaries
const User = require("./userSchema");
const Motion = require("./userMotionSchema");
const Workout = require("./userWorkoutSchema");
const Weight = require("./userWeightSchema");
const config = require("../config/loginConfig");

async function getUserInfo(req, res, next) {
	try {
		const user = await User.findById(req.user)
			.populate("weights") // Populate the weights array with actual weight documents
			.exec();
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		//console.log(user.createdDate);
		const workoutCount = await Workout.countDocuments({ user: req.user });
		const userInfo = {
			_id: user._id,
			name: user.name,
			username: user.username,
			email: user.email,
			date: user.createdDate,
			workoutCount: workoutCount,
			weights: user.weights,
			startingWeight: user.startingWeight,
			currentWeight: user.currentWeight,
			goalWeight: user.goalWeight,
			weeklyGoal: user.weeklyGoal,
		};
		res.status(200).json(userInfo);
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "Server Error" });
	}
}

async function createWorkout(req, res, next) {
	//console.log(`request made it though: ${JSON.stringify(req.body)}`)
	try {
		const user = await User.findById({ _id: req.user });

		const newWorkout = new Workout({
			user: user._id,
			name: req.body.name,
		});

		await newWorkout.save();

		// Validate each motion object against the schema of the Motion model
		const motionData = req.body.motions;
		const validatedMotions = await Promise.all(
			motionData.map(async (motion) => {
				try {
					const validatedMotion = new Motion({
						user: user._id,
						workout: newWorkout._id,
						name: motion.name,
						primaryMuscle: motion.primaryMuscle,
						secondaryMuscle: motion.secondaryMuscle,
						reps: motion.reps,
						weight: motion.weight,
						time: motion.time,
					});
					await validatedMotion.validate();
					await validatedMotion.save();
					return validatedMotion.toObject();
				} catch (err) {
					console.error("Motion validation error", err.message);
					return null;
				}
			}),
		);
		// Filter out motions with validation failures
		const filteredMotions = validatedMotions.filter(
			(motion) => motion !== null,
		);
		newWorkout.motions = filteredMotions;
		await newWorkout.save();

		user.workouts.push(newWorkout);
		await user.save();

		res.status(201).json({
			message: "Workout created successfully",
			workout: newWorkout,
		});
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "Server Error" });
	}
}

module.exports = { getUserInfo: getUserInfo, createWorkout: createWorkout };
