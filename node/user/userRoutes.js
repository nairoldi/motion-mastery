const express = require('express');
const bodyParser = require('body-parser');


const sutil = require("../util/util");

// import controller when ready

const UserRouter = express.Router(); 
UserRouter.use(bodyParser.json());
const userController = require('./userController.js');

REQ_KEYS = {	};

UserRouter.use((req, res, next) => {
	console.log('Request reached UserRouter middleware');
	console.log('Cookies:', req.cookies);
	res.locals.bodyData = req.body;
	console.log(req.path);
	sutil.ValidateToken(req, res, next);
    next();
});



//UserRouter.use(sutil.ValidateToken);

UserRouter.get('/myInfo', async (req, res, next) => {
	userController.getUserInfo(req, res, next);
});

module.exports = {
    UserRouter:UserRouter,
}