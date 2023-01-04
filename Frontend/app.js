var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var passport= require('passport');
var flash= require('connect-flash');

var index = require('./routes/indexRouter');
var users = require('./routes/users');
var admin = require('./routes/adminRouter');
var employee = require('./routes/employeeRouter');
// var senior = require('./routes/seniorRouter');
var home = require('./routes/home');
var manager = require('./routes/managerRouter');
var nodemailer=require('nodemailer')
const dotenv=require("dotenv")
dotenv.config();

const sessions = require("express-session");

expressValidator = require('express-validator');

mongoose.Promise = global.Promise;
var mongoDB = process.env.MONGO_URL;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});


var db = mongoose.connection;

db.on("error", () => {
    console.log("MongoDB connection failed...");
});
db.once("open", () => {
    console.log("MongoDB connection successful...");
});
require('./config/passport.js');
var app = express();
const oneDay = 1000*60*60*24 ;
app.use(sessions({
  secret: "mysecretkey9876543210",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public/
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//validator should be ater body parser
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/manager', manager);
app.use('/employee', employee);
app.use('/home', home);
app.use('/senior', senior);


app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  res.locals.messages=req.flash();
  next();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
