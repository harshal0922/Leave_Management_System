var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var config_passport = require('../config/passport.js');
var moment = require('moment');
const axios = require("axios");
var bcrypt=require('bcrypt-nodejs');

var nodemailer=require('nodemailer');
const { request } = require('express');

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
    subject: 'Your Profile has been created',
    text: ''
  };

router.use('/', isLoggedIn, function isAuthenticated(req, res, next) {
    next();
});
const logout=(isLoggedIn, function logoutUser(req, res, next) {
    req.session.destroy();
    req.logout(); // destroys the csurf token
    res.redirect('/');
});

const adminHome=(function viewHome(req, res, next) {
    res.render('Admin/adminHome', {
        title: 'Admin Home',
        hasErrors:0,
        userName: req.session.username
    });
});

const balanceLeave=(function viewProfile(req, res, next) {

    var id= req.session.empId;
    var username=req.session

    axios.get("http://localhost:8080/employee/view-balance-leaves/"+id)
  .then((user) => {
        console.log(user.data);
        res.render("Admin/balanceLeaves",{employee:user.data,title:"Balance",userName:username})
  });
});

const aboutUs=(req,res)=>{
    res.render("partials/admin/aboutUs",{
        userName: req.session.username
    });
}

const contactUs=(req,res)=>{
    res.render("partials/admin/contactUs",{
        userName: req.session.user.name
    });
};

const viewProfile=( function viewProfile(req, res, next) {
    var id= req.session.empId;
    console.log(req.session)
    var username=req.session

    axios.get("http://localhost:8080/manager/view-profile/"+id)
  .then((user) => {
        console.log(user.data);
        res.render("Admin/viewProfile",{employee:user.data,title:"Profile",userName:username,moment:moment})
  });
});

const allEmployee=( function viewAllEmployees(req, res, next) {
    axios.get("http://localhost:8080/admin/view-employee")
  .then((emp) => {
    userName=req.session.username
    var hasEmp=1;
    var title="All EMployees"
        console.log(emp.data);
        res.render("Admin/viewAllEmployee",{users:emp.data,hasEmp,title,userName,moment: moment})
  });
});

const addEmployee=(function addEmployee(req, res, next) {
    
    var messages = req.flash('error');
    
    res.render('Admin/addEmployee', {
        title: 'Add Employee',
        messages: messages,
        hasErrors: messages.length > 0,
        userName: req.session.username,

    })

});

const viewHoliday=(function viewAllHoliday(req, res, next) {
    var holidayChunks = [];

    //find is asynchronous function
    axios.get("http://localhost:8080/admin/view-holiday/")
    .then((holiday) => {
        username=req.session.username
        const hasHoliday=1;
          console.log(holiday.data);
          res.render("Admin/publicHoliday",{holiday:holiday.data,hasHoliday,title:"List Of Public Holidays",userName:username})
    });
});

const addHoliday=(function addEmployee(req, res, next) {
    var messages = req.flash('error');
    
    res.render('Admin/addHoliday', {
        title: 'Add Holiday',

        userName: req.session.username,
    });
});


const leaveApplication=(function getLeaveApplications(req, res, next) {
    username=req.session.usernaem

    axios.get("http://localhost:8080/admin/view-all-leaves")
    .then((user) => {
        hasLeave=1;
          console.log(user.data);
          res.render("Admin/allApplications",{leaves:user.data,title:"Balance",userName:username,hasLeave, moment: moment})
    });
});
const respondApplicationId=(function respondApplication(req, res, next) {
    var leaveID = req.params.leave_id;
    var employeeID = req.params.employee_id;
    if(req.session.user.type=="admin"){
    Leave.findById(leaveID, function getLeave(err, leave) {

        if (err) {
            console.log(err);
        }
        User.findById(employeeID, function getUser(err, user) {
            console.log(user)
            if (err) {
                console.log(err);
            }
            res.render('admin/applicationResponse', {
                title: 'Respond Leave Application',
                csrfToken: req.csrfToken(),
                leave: leave,
                employee: user,
                moment: moment, userName: req.session.user.name
            });


        })


    });return
    }
    res.render("error")

});

const postRespondApplication=(function respondApplication(req, res) {
    Leave.findById(req.body.leave_id, function getLeave(err, leave) {
        leave.managerResponse = req.body.status;
        var leaveType=leave.type;
        User.findById(leave.applicantID, function getUser(err, user) {
            if (err) {
                console.log(err);
            }else if(leave.managerResponse=="Approved"){
            var balanceLeave=user.balanceLeave;
            balanceLeave[leaveType]=balanceLeave[leaveType]-leave.period;
            user.save();
        }
        })
            
        leave.save(function saveLeave(err) {
            if (err) {
                console.log(err);
            }
            // mailOptions.to=req.body.email;
            var emailText="Your leave have been recieved to us and manager has "+req.body.status+" your leave"
            mailOptions.text=emailText;
            mailOptions.to=leave.email;
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info);
                }
              })
            res.redirect('/admin/leave-applications');
        })
    })

});

const getEmployeeProject=(function getAllEmployeePojects(req, res, next) {
    var empId = req.params.id;
    axios.get("http://localhost:8080/admin/view-project/"+empId)
    .then((project) => {
        username=req.session.username
        const  empName=project.empName;
        const hasProject=1;
          console.log(project.data);
          res.render("Admin/employeeAllProjects",{projects:project.data,empName,hasProject,title:"List Of Project",userName:username})
    });
});

const getEmployeeProfile=(function getEmployeeProfile(req, res, next) {
    var employeeId = req.params.id;

    axios.get("http://localhost:8080/admin/view-employee/"+employeeId)
  .then((user) => {
        console.log(user.data);
        res.render("Admin/employeeProfile",{employee:user.data,title:"Balance",username:req.session.username,moment: moment})
  });
   
});


const editEmployee=(function editEmployee(req, res, next) {
    var employeeId = req.params.id;
    User.findById(employeeId, function getUser(err, user) {
        if (err) {
            res.redirect('/admin/');
        }
        res.render('Admin/editEmployee', {
            title: 'Edit Employee',
            employee: user,
            moment: moment,
            message: '',
            userName: req.session.user.name
        });


    });

});


const editEmployeeProject=(function editEmployeeProject(req, res, next) {
    var projectId = req.params.id;
    Project.findById(projectId, function getProject(err, project) {
        if (err) {
            console.log(err);
        }
        res.render('Admin/editProject', {
            title: 'Edit Employee',
            csrfToken: req.csrfToken(),
            project: project,
            moment: moment,
            message: '',
            userName: req.session.user.name
        });


    });

});


const addEmployeeProject=(function addEmployeeProject(req, res, next) {

    var employeeId = req.params.id;
   
        res.render('Admin/addProject', {
            title: 'Add Employee Project',
            empId: employeeId,
            moment: moment,
            message: '',
            userName: req.session.username
        });

});

const employeeProjectInfo=(function viewEmployeeProjectInfo(req, res, next) {
    var projectId = req.params.id;
    Project.findById(projectId, function getProject(err, project) {
        if (err) {
            console.log(err);
        }
        User.findById(project.employeeID, function getUser(err, user) {
            if (err) {
                console.log(err);
            }
            res.render('Admin/projectInfo', {
                title: 'Employee Project Information',
                project: project,
                employee: user,
                moment: moment,
                message: '',
                userName: req.session.user.name,
                csrfToken: req.csrfToken()
            });
        })

    });

});



const redirectEmployeeProfile=(function viewEmployeeProfile(req, res, next) {
    var employeeId = req.user.id;
    User.findById(employeeId, function getUser(err, user) {
        if (err) {
            console.log(err);
        }
        res.redirect('/admin/employee-profile/' + employeeId);

    });

});

const postAddEmployee=(function postAddEmployee(req,res) {

    const body = req.body;
    console.log(body)
    req.body.man_id=21;
    req.body.role=req.body.designation
    // mail functionality
    var emailText="Dear "+req.body.empName+" We have successfully created your account Your username is "+req.body.email+" and Your password is your contact number http://localhost:8000/ click here and change your password"
            mailOptions.text=emailText;
            mailOptions.to=req.body.email;
            console.log(mailOptions.to)
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info);
                }
              })
    axios.post("http://localhost:8080/admin/addEmployee",body)

    setTimeout(render_view, 1500);
    function render_view(){
    res.redirect("/admin/view-all-employees");
    }
});

const postAddHoliday =(function applyForHoliday(req, res, next) {
    
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date  = new Date(req.body.date);
    var modDate=date.toLocaleDateString("en-IN", options)
    let text = modDate.toString();
    req.body.date=text;
    const body= req.body
    console.log(body)

    axios.post("http://localhost:8080/admin/addHoliday",body)
    setTimeout(render_view, 1500);
    function render_view(){
    res.redirect("/admin/view-holiday");
    }

});

const postEditEmployee=(function editEmployee(req, res) {
    var employeeId = req.params.id;
    var newUser = new User();
    newUser.email = req.body.email;
    if (req.body.designation == "Manager") {
        newUser.type = "Manager";
    }
    else if (req.body.designation == "Senior") {
        newUser.type = "Senior";
    }
    else {
        newUser.type = "Employee";
    }
    newUser.name = req.body.name,
        newUser.dateOfBirth = new Date(req.body.DOB),
        newUser.contactNumber = req.body.number,
        newUser.department = req.body.department;
    newUser.Skills = req.body['skills[]'];
    newUser.designation = req.body.designation;

    User.findById(employeeId, function getUser(err, user) {
        if (err) {
            res.redirect('/admin/');
        }
        if (user.email != req.body.email) {
            User.findOne({'email': req.body.email}, function getUser(err, user) {
                if (err) {
                    res.redirect('/admin/');
                }
                if (user) {
                    res.render('Admin/editEmployee', {
                        title: 'Edit Employee',
                        csrfToken: req.csrfToken(),
                        employee: newUser,
                        moment: moment,
                        message: 'Email is already in use', userName: req.session.user.name
                    });

                }
            });
        }
        user.email = req.body.email;
        if (req.body.designation == "Manager") {
            user.type = "Manager";
        }
        else {
            user.type = "Employee";
        }
        user.name = req.body.name,
            user.dateOfBirth = new Date(req.body.DOB),
            user.contactNumber = req.body.number,
            user.department = req.body.department;
        user.Skills = req.body['skills[]'];
        user.designation = req.body.designation;

        user.save(function saveUser(err) {
            if (err) {
                console.log(error);
            }
            res.redirect('/admin/employee-profile/' + employeeId);

        });
    });

});


const postAddEmployeeProject=(function addEmployeeProject(req, res) {
    // newProject.employeeID = req.params.id;
    // newProject.title = req.body.title;
    // newProject.type = req.body.type;
    // newProject.startDate = new Date(req.body.start_date),
    //     newProject.endDate = new Date(req.body.end_date),
    //     newProject.description = req.body.description,
    //     newProject.status = req.body.status;

    // newProject.save(function saveProject(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     res.redirect('/admin/employee-project-info/' + newProject._id);
    // });
    console.log(req.body)
    console.log(req.params.id)
    req.body.empId=req.params.id
    const body= req.body

    axios.post("http://localhost:8080/admin/addProject",body)
    setTimeout(render_view, 1500);
    function render_view(){
    res.redirect("/admin/view-all-employees");
    }
});


const postEditEmployeeProject=(function editEmployeeProject(req, res) {
    var projectId = req.params.id;
    var newProject = new Project();

    Project.findById(projectId, function (err, project) {
        if (err) {
            console.log(err);
        }
        project.title = req.body.title;
        project.type = req.body.type;
        project.startDate = new Date(req.body.start_date),
            project.endDate = new Date(req.body.end_date),
            project.description = req.body.description,
            project.status = req.body.status;

        project.save(function saveProject(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/admin/employee-project-info/' + projectId);

        });
    });

});

const postDeleteEmployee=(function deleteEmployee(req, res) {

    console.log(req.params)
    id=req.params.id

    axios.delete("http://localhost:8080/admin/delete-by-id/"+id)
    res.redirect("/admin/view-all-employees")
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

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
    axios.post("http://localhost:8080/admin/apply-for-leave",body)
    .then((user)=>{
        console.log(user.data)
        console.log(typeof(user.data)=="string")
        if(typeof(user.data)=="string"){
            res.render('Admin/applyForLeave', {
                title: 'Apply for Leave',
                username: req.session.username,
                messages: user.data,
                hasErrors: true,
            });
        }else{
            res.redirect('admin/applied-leaves', {
            });
        }

    })

});


const applyForLeave=(function applyForLeave(req, res, next) {
    var messages = req.flash('error');
    res.render('admin/applyForLeave', {
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
    axios.get("http://localhost:8080/employee/view-leaves/"+eid)
  .then((leave) => {
    var hasLeave=1;
    var title="Applid Leave"
        console.log(leave.data);
        res.render("Admin/appliedLeaves",{leaves:leave.data,hasLeave,title,userName,moment: moment})
  });

});

const changePassword=(function changePassword(req, res, next) {
    var messages = req.flash('error');
    res.render('Admin/changePassword', {
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
        res.render("Admin/changePassword", {
            title: 'Change Password ',
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
                    res.redirect("/admin");
                } else {
                    //Password does not match
                    messages=errors.push({ msg: "Current password is not a match." });
                    res.render("Admin/changePassword", {
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





function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
module.exports={
    adminHome,
    aboutUs,
    contactUs,
    viewProfile,
    applyForLeave,
    appliedLeave,
    postApplyForLeave,
    allEmployee,
    addEmployee,
    viewHoliday,
    addHoliday,
    leaveApplication,
    getEmployeeProject,
    getEmployeeProfile,
    editEmployee,
    editEmployeeProject,
    addEmployeeProject,
    employeeProjectInfo,
    redirectEmployeeProfile,
    balanceLeave,
    postAddEmployee,
    postAddHoliday,
    postRespondApplication,
    respondApplicationId,
    postEditEmployee,
    postAddEmployeeProject,
    postEditEmployeeProject,
    postDeleteEmployee,
    changePassword,
    postChangePassword,
    logout
}