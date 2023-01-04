const express = require("express");
const router=express.Router();
var passport = require('passport');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);
const axios = require("axios");

const login=( function viewLoginPage(req, res, next) {
    var messages = req.flash('error');
    const hasError=0;
    res.render('login', {
        title: 'Log In',
        // csrfToken: req.csrfToken(),
        hasErrors:hasError
    });
});
const loginAuthentication = (request, response) => {
    const body = request.body;
    var hasError=1;
    axios.post("http://localhost:8080/user/login", body)
        .then((user) => {
            // console.log(user.data);
            console.log(user)
            console.log(user.data)
            console.log(user.data.role != null)
            if (user.data.role != null) {
                if (user.data.role == "employee") {
                    hasError=0;
                    console.log("inside")
                    console.log(user.data)
                    sess = request.session;
                    sess.role = user.data.role;
                    sess.manId=user.data.managerId;
                    sess.email=user.data.email;
                    sess.empId = user.data.empId;
                    sess.username=user.data.empName
                    const username=sess.username
                    console.log(request.session)
                    console.log(request.session.role)
                    response.render("Employee/employeeHome", { title: "Employee Dashboard",emp:user.data,username:username});
                } else if (user.data.role == "admin") {
                    hasError=0;
                    sess = request.session;
                    sess.role = user.data.role;
                    sess.manId=user.data.managerId;
                    sess.email=user.data.email;
                    sess.empId = user.data.empId;
                    sess.username=user.data.empName
                    const username=sess.username
                    console.log(request.session)
                    console.log(request.session.role)
                    response.render("Admin/adminHome", { title: "Admin Dashboard",userName:sess.userName,hasErrors:hasError });
                } else if(user.data.role == "Manager"){
                    hasError=0;
                    sess = request.session;
                    sess.role = user.data.role;
                    sess.manId=user.data.managerId;
                    sess.email=user.data.email;
                    sess.empId = user.data.empId;
                    sess.username=user.data.empName
                    const username=sess.username
                    console.log(request.session)
                    console.log(request.session.role)
                    response.render("Manager/managerHome", { title: "Manager Dashboard",userName:sess.userName,hasErrors:hasError });
                }
            }else{
                const hasErrors=1;
                response.render("login", { messages: "Invalid Credentials" ,hasErrors});
            }
        })
};
const signUp=(function signUp(req, res, next) {

    var messages = req.flash('error');
    res.render('signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
const logout=(isLoggedIn, function logoutUser(req, res, next) {
    req.session.destroy();
    req.logout(); // destroys the csurf token
    res.redirect('/');
});

const checkType=(function checkTypeOfLoggedInUser(req, res, next) {
    req.session.user = req.user;
    if (req.user.designation == "Manager") {
        res.redirect('/manager/');
    }
    else if (req.user.designation == "Employee") {
        res.redirect('/employee/');
    }
    else if(req.user.designation=="Senior"){
        res.redirect('/senior/')
    }else{
        res.redirect('/admin/');
    }

});
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports={
    login,
    signUp,
    logout,loginAuthentication,
    checkType
}