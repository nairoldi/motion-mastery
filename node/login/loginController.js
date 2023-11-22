const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../user/userSchema");
const config = require('../config/loginConfig'); 


async function createAccount(req, res, next) {
	var name;
	var email = req.body.email;
	var pass = req.body.pass;
	var username = req.body.user;
	var has_name = false;

	const hashed_password = bcrypt.hashSync(pass, 10);
    // console.log(hashed_password);
	
    if (req.body.hasOwnProperty("name")) {
		has_name = true;
		name = req.body.name;
	}

	try {
		var new_user;
		if (has_name) {
			new_user = new User({
				name: name,
				email: email,
				password: hashed_password,
				username: username,
			});
		} else {
			new_user = new User({
				email: email,
				password: hashed_password,
				username: username,
			});
		}

		await new_user.save();
        res.send({"created": true});

	} catch (error) {
		console.log("new signup failed");
	    // console.log(error.message);
        if(error.code == 11000){ res.send({"created": false, "message": "Email already exists! try logging in"}); }
        else{
            res.send({"created": false, "message": e.message});
        }
    }
}

async function signIn(req, res, next) {
	var email = req.email;
	var pass = req.pass;
	try {
		const user = await User.findOne({ email: email });
		if (user) {
			const passCompare = bcrypt.compare(pass, user.password);

			if (passCompare) {
                console.log(user);
                try {
                    var token = jwt.sign({id:user._id},  config.jwtSecret);
                    res.send({jwtToken:token});
                }
                catch(e){
                    next(e.message);
                }
            } 
            else {
				next("password was not a match");
			}
		} 
        else {
            next('no user with that email exists')
		}
	} catch (e) {
        res.status(401).send(e.message);
    }
}


async function DeleteUser(req,res,next){
    const user = res.locals.user;
    try{
        const deleteUser = await User.deleteOne({_id:user});
        res.send({deleted:true, count:deleteUser});
    }
    catch(e){
        res.send({message:e.message});
    }

}

module.exports = {
	createAccount: createAccount,
    signIn: signIn,
    DeleteUser: DeleteUser,
};
