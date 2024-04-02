// this will be things the user can get their workouts summaries
const User = require("../user/userSchema");
const config = require('../config/loginConfig'); 

async function getUserInfo(req, res, next) {
    
    try {
        //const user = User.findById({_id:id})
    } catch (e) {
        console.error(e);
    }
}

module.exports = { getUserInfo: getUserInfo }