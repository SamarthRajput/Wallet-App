//this middleware needs to make sure if you have any authenticated request they need to flow through the middleware 
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config")

const authMiddleware = (req, res, next) => {
    //get the authHeader in the header
    const authHeader = req.headers.authorization;

    //and make sure it starts with Bearer, Checks the headers for an Authorization header (Bearer <token>)
    //Bearer tells us the type of token this is we can have various types of tokens that can be used for authenticating request 
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        else{
            return res.status(403).json({});
        }
    }
    catch(err){
        return res.status(403).json({});
    }
}

module.exports = {
    authMiddleware
}