const express = require('express');
const bodyParser = require('body-parser');

const sutil = require("../util.js");

// import controller when ready

const UserRouter = express.Router(); 
UserRouter.use(bodyParser.json());

