const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config() 
const app = express();

const PORT = process.env.SERVER_PORT || 3001;

// routers
//const Login = require('./src/login/loginRoutes').LoginRouter;

// test entry point
app.get("/api", (req, res, next) => {
    console.log("your in /api")
    res.send("you made it !")
    next();
})
// mount routers
//app.use('/login', Login);

app.listen(PORT , () => {
    console.log(`Running on port ${PORT}`);
    connect_mongo();
});

async function connect_mongo(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("we have connected to mongo!!");
    }
    catch(error){
        console.log("connection failed");
        console.log(error.message);
    }
}