var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
const indexController=require("../controller/indexController");

router.get("/",indexController.login);
router.get("/signup",indexController.signUp);
router.get("/logout",indexController.logout);
router.get("/check-type",indexController.checkType);


router.post("/login" , indexController.loginAuthentication);

module.exports = router;

