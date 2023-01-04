var express = require('express');
var router = express.Router();
var moment = require('moment');
var csrf = require('csurf');
var csrfProtection = csrf();
var moment = require('moment');
const axios = require("axios");
var bcrypt=require('bcrypt-nodejs');
var moment = require('moment');

router.use('/', isLoggedIn, function checkAuthentication(req, res, next) {
    next();
});
const logout=(isLoggedIn, function logoutUser(req, res, next) {

    req.logout(); // destroys the csurf token
    res.redirect('/');
});
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

const employeeHome=(function viewHome(req, res, next) {
    res.render('Employee/employeeHome', {
        title: 'Home',
        username: req.session.username,
    });
});

const aboutUs=(req,res)=>{
    res.render("partials/employee/aboutUs",{
        username: req.session.username
    });
}
const contactUs=(req,res)=>{
    res.render("partials/employee/contactUs",{
        userName: req.session.user.name
    });
}

const applyForLeave=(function applyForLeave(req, res, next) {
    var messages = req.flash('error');
    console.log(req.session.username)
    res.render('Employee/applyForLeave', {
        title: 'Apply for Leave',
        username: req.session.username,
        messages: messages,
        hasErrors: false,
    });
});
const changePassword=(function changePassword(req, res, next) {
    var messages = req.flash('error');
    res.render('Employee/changePassword', {
        title: 'Change Password',
        csrfToken: req.csrfToken(),
        userName: req.session.user.name,
        messages: "",
        hasErrors: false,
    });
});
const appliedLeave=(function viewAppliedLeaves(req, res, next) {
    // console.log(req.session)
    const eid=req.session.empId;
    console.log(req.session.user)
    const username=req.session.username
    console.log(username)
    axios.get("http://localhost:8080/employee/view-leaves/"+eid)
  .then((leave) => {
    var hasLeave=1;
    var title="Applid Leave"
        console.log(leave.data);
        res.render("Employee/appliedLeaves",{leaves:leave.data,hasLeave,title,username,moment: moment})
  });

});

const viewHoliday=(function viewAllHoliday(req, res, next) {
    var username=req.session.username
    axios.get("http://localhost:8080/employee/view-holiday")
  .then((holiday) => {
        console.log(holiday.data);
        res.render("Employee/publicHoliday",{holiday:holiday.data,title:"Holiday",username:username})
  });
});

const viewProfile=(function viewProfile(req, res, next) {
    var id= req.session.empId;
    var username=req.session

    axios.get("http://localhost:8080/employee/view-profile/"+id)
  .then((user) => {
        console.log(user.data);
        res.render("Employee/viewProfile",{employee:user.data,title:"Balance",username:username,moment:moment})
  });
    

});

const balanceLeave=(function balanceLeave(req, res, next) {

    var id= req.session.empId;
    var username=req.session

    axios.get("http://localhost:8080/employee/view-balance-leaves/"+id)
  .then((user) => {
        console.log(user.data);
        res.render("Employee/balanceLeaves",{employee:user.data,title:"Balance",username:username})
  });
});

const viewAllProject=(function viewAllProjects(req, res, next) {

    var id= req.session.empId;
    var username=req.session

    axios.get("http://localhost:8080/employee/view-project/"+id)
  .then((user) => {
    const hasProject=1
        console.log(user.data);
        res.render("Employee/viewPersonalProjects",{projects:user.data,hasProject,title:"List Of Projects",username:username,moment:moment})
  });

});

const viewProjectId=(function viewProject(req, res, next) {

    var id= req.params.project_id;
    var username=req.session

    axios.get("http://localhost:8080/employee/view-projectById/"+id)
  .then((user) => {
    const hasProject=1
        console.log(user.data);
        res.render("Employee/viewProject",{project:user.data,hasProject,title:"List Of Projects",username:username,moment:moment})
  });
    


});

const postApplyForLeave=(function applyForLeave(req, res, next) {
    startDate = new Date(req.body.startDate);
    endDate = new Date(req.body.endDate);
    var Difference_In_Time = endDate.getTime() - startDate.getTime();
    var days= Difference_In_Time / (1000 * 3600 * 24);
    console.log(days)
    const period = days+1;
    var hasError=0;
    

    const body=req.body
    req.body.applicantId=req.session.empId
    req.body.role=req.session.role;
    req.body.period=period;
    req.body.applicantName=req.session.username;
    req.body.email=req.session.email;
    req.body.manId=req.session.manId
    console.log(req.body)
    axios.post("http://localhost:8080/employee/apply-for-leave",body)
    .then((user)=>{
        console.log(user.data)
        console.log(typeof(user.data)=="string")
        if(typeof(user.data)=="string"){
            res.render('Employee/applyForLeave', {
                title: 'Apply for Leave',
                username: req.session.username,
                messages: user.data,
                hasErrors: true,
            });
        }else{
            res.redirect('employee/applied-leaves', {
            });
        }

    })

});


const postChangePassword=(function ensureAuthenticated(req, res) {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    console.log(currentPassword,newPassword,confirmNewPassword)
    // console.log(req.user)
    const userID = req.user._id;
    let errors = [];
    //Check passwords match
    if (newPassword !== confirmNewPassword) {
        errors= "New password does not match confirm password";
    }
    if (currentPassword == newPassword) {
        errors= "Current password is same as new password";
    }
    
    //Check password length
    if (newPassword.length < 6 || confirmNewPassword.length < 6) {
        errors="Password should be at least six characters.";
    }
    
    if (errors.length > 0) {
        // var messages = req.flash('error');
        res.render("Employee/changePassword", {
            title: 'Change Password',
            csrfToken: req.csrfToken(),
            messages: errors,
            hasErrors: true,
            userName: req.session.user.name,
        });
    } else {
        //VALIDATION PASSED
        //Ensure current password submitted matches
        User.findOne({ _id: userID }).then(user => {
            //encrypt newly submitted password
            console.log("jijijd")
            console.log(user.password,newPassword)
            bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    console.log("onsjisjdi")
                    //Update password for user with new password
                    bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newPassword, salt, null, function (err, hash) {
                            if (err) throw err;
                            console.log(user.password)
                            user.password = hash;
                            user.save();
                        })
                    );
                    req.flash("success_msg", "Password successfully updated!");
                    res.redirect("/employee");
                } else {
                    //Password does not match
                    messages=errors.push({ msg: "Current password is not a match." });
                    res.render("Employee/changePassword", {
                        title: 'Apply For Leave ',
                        csrfToken: req.csrfToken(),
                        messages: "Current Password is not a match",
                        hasErrors: true,
                        userName: req.session.user.name,
                    });
                }
            });
        });
    }
});
module.exports={
    employeeHome,
    aboutUs,
    contactUs,
    applyForLeave,
    appliedLeave,
    viewHoliday,
    viewProfile,
    balanceLeave,
    viewAllProject,
    viewProjectId,
    postApplyForLeave,
    logout,
    changePassword,
    postChangePassword
}