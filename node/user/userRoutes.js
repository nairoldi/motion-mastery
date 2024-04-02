const express = require('express');
const bodyParser = require('body-parser');


const sutil = require("../util/util");

// import controller when ready

const UserRouter = express.Router(); 
UserRouter.use(bodyParser.json());
const userController = require('./userController.js');

REQ_KEYS = {	};

UserRouter.use('', (req, res, next) => {
    res.locals.bodyData = req.body;
	console.log(req.path);
	console.log(req.body);
	//console.log(req);
	//sutil.verifyObject(req.body, REQ_KEYS[req.path], next);
	sutil.ValidateToken(req.body, res, next());
});

UserRouter.get('/myInfo', (req, res, next) => {
	userController.getUserInfo(res, req, next);
});

module.exports = {
    UserRouter:UserRouter,
}