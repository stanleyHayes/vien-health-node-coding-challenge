const jwt = require("jsonwebtoken");
const User   = require("../models/user.js");

const { UNAUTHORIZED}  = require( "../utils/constants.js");

/**
 * @description A controller function that gets logged in user information
 * @param {An object representing the request object} req 
 * @param {An object representing the response object} res 
 * @param {Returns control to the next middleware} next
 * @returns {null | error}
 */
const authorize = async (req, res, next) => {
    try {
        if(!req.headers) return res.status(UNAUTHORIZED).json({});
        if(req.headers && !req.headers.authorization)  return res.status(UNAUTHORIZED).json({});
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(UNAUTHORIZED).json({error: `Token not found`});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decoded.id, "logins.token": token});
        if(!user) return res.status(UNAUTHORIZED).json({error: `Session expired`});
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(500).json({error: `Error: ${error.message}`});
    }
}

module.exports =  {authorize};