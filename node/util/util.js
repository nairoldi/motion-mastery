const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/loginConfig');


/**
 * JWT validation middleware, verify our JWT in requests
 */
function ValidateToken(req, res, next) {
  console.log('in validate token');
  console.log(req.cookies.JWT_TOKEN);
  console.log(JSON.stringify(req.headers));
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);
   if(!authHeader) {
      return res.status(401).send({ 'message': 'no token recieved' });
    }
  const token = authHeader.split(' ')[1];
  if (!token) {
        return res.status(401).send({ 'message': 'No token provided' });
  }
  
   // Log the token splitting
    const tokenParts = authHeader.split(' ');
    console.log('Token Parts:', tokenParts);

    // Extract token from tokenParts
    const token1 = tokenParts[1];
    console.log('Token:', token1);
  //console.log(req.cookies.jwt);
  console.log('token below')
  console.log(token);
   
    // should have token here , time to verify
    jwt.verify(token, jwtSecret, (err, user) => {
        if(err) {
          return res.status(403).send({ 'message': 'this token is no longer valid' });
        }
        // by now the token is valid and we can attatch the user to the request
        console.log(user);
        res.locals.user = user.id; //  moved this to be added into the response object, unsure if we are allowed to add to the request object at this stage
        //console.log(json.stringify(user));
        //console.log(user);
        next();
      }
    )
  }
  /**
   * makes sure all the needed keys are in the object
   * @param {*} object object in which we are looking for a specific property
   * @param {*} keys properties that will be looked for in the object
   */
function checkKeys(object, keys) {
  console.log('checkKeys');
    console.log(object);
    console.log('keys');
    console.log(keys);
    console.log(`[${Object.keys(object)}] v.s [${keys}]`);
    if(!object) {
      return false;
    }

    for(k in keys){
      if(object.hasOwnProperty(keys[k])){
        continue;
      }
      else {
        return false;
      }
    }
    return true;
  }

  /**
   * wrapper fn to call checkKeys to make sure all necessary keys are in the object or return an error message
   * @param {*} object object that we are checking for the right keys 
   * @param {*} required_keys keys that should be in the object
   * @param {*} next express next call 
   */
  function verifyObject(object, required_keys, next){
    
    if(checkKeys(object, required_keys) || required_keys == true){
      // keys are vaild go to next function 
      next()
    } 
    else {
      // keys are missing , return error message
      next('missing required keys')
    }
  }

  module.exports = {
    ValidateToken:ValidateToken,
    verifyObject:verifyObject, 
  }

