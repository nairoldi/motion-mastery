const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../user/userSchema");
const config = require('../config/loginConfig'); 

async function handleRefreshToken(req, res, next) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

	try {
		
		const user = await User.findOne({ refreshToken: refreshToken });

		if (user) {

                jwt.verify(refreshToken, process.env.refreshSecret, (err, decoded) => {
                    if (err || user._id !== decoded.id) return res.status(403);
                    const accessToken = jwt.sign({ id: user._id }, process.env.jwtSecret, { expiresIn: '1d' }); // play with then with new route from home page
                    res.json({ accessToken });
                }
            );

			
		} 
        else {
			res.send(403).send(e.message);
            next()
		}
	} catch (e) {
        res.status(401).send(e.message);
    }
}

module.exports = {
    handleRefreshToken: handleRefreshToken,
}