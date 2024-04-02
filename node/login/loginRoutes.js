const express = require("express");
const bodyParser = require("body-parser");

const sutil = require("../util/util.js");

const loginController = require("./loginController.js");
const LoginRouter = express.Router();
LoginRouter.use(bodyParser.json());

REQ_KEYS = {
	"/signup": ["email", "pass", "user"],
	"/login": ["email", "pass"],
};

LoginRouter.use("", (req, res, next) => {
	res.locals.bodyData = req.body;
	console.log(req.path);
	console.log(req.body);
	//console.log(REQ_KEYS.path);
	//sutil.verifyObject(req.body, REQ_KEYS[req.path], next);
	next()
});

LoginRouter.post("/signup", (req, res, next) => {
	loginController.createAccount(req, res, next);
});

LoginRouter.post("/login", (req, res, next) => {
	loginController.signIn(req, res, next);
});

module.exports = { LoginRouter: LoginRouter };
