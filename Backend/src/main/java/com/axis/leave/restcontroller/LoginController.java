/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Login Controller
*/

package com.axis.leave.restcontroller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.leave.entity.Employee;
import com.axis.leave.service.IAdminService;

@RestController
@RequestMapping("/user")
public class LoginController {
	@Autowired
	IAdminService adminService;
	
	@PostMapping("/login")
	public ResponseEntity<Employee> login(@RequestBody Employee emp , HttpServletRequest request) {
		String email = emp.getEmail();
		String password = emp.getPassword();
		Employee emp2=new Employee();
		System.out.println(email+password);
//		HttpSession session = request.getSession();
		
		if(email.isBlank()==false && password.isBlank()== false ) {
			boolean isValid = adminService.isValid(email, password);
			if(isValid == true) {
				Employee emp1= adminService.findUser(email, password);
//				String role = emp1.getRole();
//				System.out.println(role);
//				String email1 = emp1.getEmail();
//				int empId = emp1.getEmpId();
//				session.setAttribute("role", role);
//				session.setAttribute("email", email1);
//				session.setAttribute("empId", empId);
				return  new ResponseEntity<Employee>(emp1 , HttpStatus.OK) ;
				//return new ResponseEntity<String>("Login Successfull "+ role , HttpStatus.OK) ;
			}
		}
		return new ResponseEntity<Employee>(emp2,HttpStatus.OK) ;
		//return new ResponseEntity<String>("Invalid Login...", HttpStatus.BAD_REQUEST) ;
	}
	@RequestMapping("/logout")
	public ResponseEntity<String> logout(HttpSession session){
		session.invalidate();
		return new ResponseEntity<String>("Logout Successfull ", HttpStatus.OK) ;
	}
}
