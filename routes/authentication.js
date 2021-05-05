const express  = require( "express");
const {register, logout, login, getProfile}  = require( "../controllers/authentication.js");
const { authorize }  = require( "../middleware/authentication.js");

const router = express.Router({mergeParams: true});

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authorize, logout);
router.get('/profile', authorize, getProfile);

module.exports =  router;