// this will be things the user can get their workouts summaries
const User = require("../user/userSchema");
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
    
}

module.exports = { getUserInfo: getUserInfo }