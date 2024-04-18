// this will be things the user can get their workouts summaries
const User = require("../user/userSchema");
const config = require('../config/loginConfig'); 

async function getUserInfo(req, res, next) {
    console.log('in getUserInfo');
    const token = req.cookies['jwt'];
    console.log(token);
    /*
    try {
        const user = await User.findById({ _id: id })
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server Error' });
    }
    */
}

module.exports = { getUserInfo: getUserInfo }