var express = require('express');
var router = express.Router();
const axios = require("axios");
var moment = require('moment');

var nodemailer=require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harshalpatil092000@gmail.com',
      pass: 'plxhwyoixuikifmk'
    }
  });

  var mailOptions = {
    from: 'harshalpatil092000@gmail.com',
    to: '',
    subject: 'Your status of leave',
    text: ''
  };

router.use('/', isLoggedIn, function checkAuthentication(req, res, next) {
    next();
});

const aboutUs=(req,res)=>{
    res.render("partials/manager/aboutUs",{
        userName: req.session.username
    })
}
const contactUs=(req,res)=>{
    if(req.session.user.type=="Manager"){
    res.render("partials/manager/contactUs",{
        userName: req.session.user.name
    });return
}res.render("error")
}
const managerHome=(function viewHomePage(req, res, next) {
  
    res.render('Manager/managerHome', {
        title: 'Manager Home',
        userName: req.session.username
    });
});

const logout=(isLoggedIn, function logoutUser(req, res, next) {

    req.logout(); // destroys the csurf token
    res.redirect('/');
});


const balanceLeave=(function balanceLeave(req, res, next) {

    var id= req.session.empId;
    var username=req.session

    axios.get("http://localhost:8080/employee/view-balance-leaves/"+id)
  .then((user) => {
        console.log(user.data);
        res.render("Manager/balanceLeaves",{employee:user.data,title:"Balance",userName:username})
  });
});

const viewHoliday=(function viewAllHoliday(req, res, next) {
    username=req.session.username

   //find is asynchronous function
   axios.get("http://localhost:8080/admin/view-holiday/")
   .then((holiday) => {
       username=req.session.username
       const hasHoliday=1;
         console.log(holiday.data);
         res.render("Manager/publicHoliday",{holiday:holiday.data,hasHoliday,title:"List Of Public Holidays",userName:username})
   });
});



const postRespondApplication=(function respondApplication(req, res) {
    console.log(req.body)
    var status=req.body.status;
    var leaveId=req.body.leave_id;

    var emailText="Your leave have been recieved to us and manager has "+req.body.status+" your leave"
    mailOptions.text=emailText;
    mailOptions.to=req.body.email;
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info);
        }
      })
    axios.get("http://localhost:8080/manager/respond-application/"+status+"/"+leaveId)
    setTimeout(render_view, 1500);
    function render_view(){
    res.redirect("/manager/leave-applications");
    }

});
const leaveApplication=(function getLeaveApplications(req, res, next) {

    username=req.session.username

    axios.get("http://localhost:8080/manager/view-all-leave")
    .then((user) => {
        hasLeave=1;
          console.log(user.data);
          res.render("Manager/allApplications",{leaves:user.data,title:"All Application",userName:username,hasLeave, moment: moment})
    });
});
const respondApplicationId=(function respondApplication(req, res, next) {
    
    username=req.session.username
    console.log(req.params)
    const id = req.params.leave_id
    axios.get("http://localhost:8080/manager/leave-application/"+id)
    .then((user) => {
        hasLeave=1;
          console.log(user.data);
          res.render("Manager/applicationResponse",{leave:user.data,title:"All Application",userName:username,hasLeave, moment: moment})
    });

});



const viewProfile=(function viewProfile(req, res, next) {
    var id= req.session.empId;
    console.log(req.session)
    var username=req.session

    axios.get("http://localhost:8080/manager/view-profile/"+id)
  .then((user) => {
        console.log(user.data);
        res.render("Manager/viewManagerProfile",{employee:user.data,title:"Profile",userName:username,moment:moment})
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
    axios.post("http://localhost:8080/manager/apply-for-leave",body)
    .then((user)=>{
        console.log(user.data)
        console.log(typeof(user.data)=="string")
        if(typeof(user.data)=="string"){
            res.render('Manager/applyForLeave', {
                title: 'Apply for Leave',
                userName: req.session.username,
                messages: user.data,
                hasErrors: true,
            });
        }else{
            res.redirect('manager/applied-leaves', {
            });
        }

    })

});


const applyForLeave=(function applyForLeave(req, res, next) {
    var messages = req.flash('error');
    res.render('manager/applyForLeave', {
        title: 'Apply for Leave',
        userName: req.session.username,
        messages: messages,
        hasErrors: false,
    });
});
const appliedLeave=(function viewAppliedLeaves(req, res, next) {
    // console.log(req.session)
    const eid=req.session.empId;
    console.log(req.session.user)
    const userName=req.session.username
    axios.get("http://localhost:8080/manager/view-leaves/"+eid)
  .then((leave) => {
    var hasLeave=1;
    var title="Applied Leave"
        console.log(leave.data);
        res.render("Manager/appliedLeaves",{leaves:leave.data,hasLeave,title,userName,moment: moment})
  });
});

const changePassword=(function changePassword(req, res, next) {
    var messages = req.flash('error');
    res.render('Manager/changePassword', {
        title: 'Change Password',
        csrfToken: req.csrfToken(),
        userName: req.session.user.name,
        messages: "",
        hasErrors: false,
    });
});
const postChangePassword=(function ensureAuthenticated(req, res) {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    console.log(currentPassword,newPassword,confirmNewPassword)
    // console.log(req.user)
    const userID = req.user._id;
    let errors = [];
    //Check passwords match
    if (newPassword !== confirmNewPassword) {
        errors.push({ msg: "New passwords do not match." });
    }
    
    //Check password length
    if (newPassword.length < 6 || confirmNewPassword.length < 6) {
        errors.push({ msg: "Password should be at least six characters." });
    }
    
    if (errors.length > 0) {
        // var messages = req.flash('error');
        res.render("Manager/changePassword", {
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
            console.log(user.password,newPassword)
            bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
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
                    res.redirect("/manager");
                } else {
                    //Password does not match
                    messages=errors.push({ msg: "Current password is not a match." });
                    res.render("Manager/changePassword", {
                        title: 'Change Password',
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

const viewAllProject=(function viewAllProjects(req, res, next) {

    var projectChunks = [];
    Project.find({employeeID: req.session.user._id}).sort({_id: -1}).exec(function getProjects(err, docs) {
        var hasProject = 0;
        if (docs.length > 0) {
            hasProject = 1;
        }
        for (var i = 0; i < docs.length; i++) {
            projectChunks.push(docs[i]);
        }
        res.render('Manager/viewPersonalProjects', {
            title: 'List Of Projects',
            hasProject: hasProject,
            projects: projectChunks,
            csrfToken: req.csrfToken(),
            userName: req.session.user.name
        });
    });
});

const viewProjectId=(function viewProject(req, res, next) {

    var projectId = req.params.project_id;
    Project.findById(projectId, function getProject(err, project) {
        if (err) {
            console.log(err);
        }
        res.render('Manager/viewProject', {
            title: 'Project Details',
            project: project,
            csrfToken: req.csrfToken(),
            moment: moment,
            userName: req.session.user.name
        });

    });


});


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports={
    aboutUs,
    managerHome,
    contactUs,
    viewHoliday,
    viewProfile,
    postRespondApplication,
    balanceLeave,
    postApplyForLeave,
    leaveApplication,
    respondApplicationId,
    applyForLeave,
    appliedLeave,
    changePassword,
    postChangePassword,
    viewAllProject,
    viewProjectId,
    logout
}