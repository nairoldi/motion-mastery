// this will be things the user can get their workouts summaries
const User = require("../user/userSchema");
const Motion = require("./userMotionSchema");
const Workout = require("./userWorkoutSchema");
const config = require('../config/loginConfig'); 

async function getUserInfo(req, res, next) {
    
    try {
        const user = await User.findById({ _id: req.user })
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server Error' });
    }
    
}

async function createWorkout(req, res, next) {
    console.log(`request made it though: ${JSON.stringify(req.body)}`)
    try {
        const user = await User.findById({ _id: req.user });
          // Validate each motion object against the schema of the Motion model
        const motionData = req.body.motions;
        const validatedMotions = await Promise.all(motionData.map(async (motion) => {
            try {
                const validatedMotions = new Motion(motion);
                await validatedMotions.validate();
                return validatedMotions.toObject();
            } catch (err) {
                console.error('Motion validation error', err.message);
                return null;
            }
        }));
        // Filter out motions with validation failures
        const filteredMotions = validatedMotions.filter(motion => motion !== null);
        const newWorkout = new Workout({
            user: user._id,
            name: req.body.name,
            motions: filteredMotions,
        });

        user.workouts.push(newWorkout);
        await user.save();
        res.status(201).json({ message: 'Workout created successfully', workout: newWorkout });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { getUserInfo: getUserInfo, createWorkout:createWorkout }