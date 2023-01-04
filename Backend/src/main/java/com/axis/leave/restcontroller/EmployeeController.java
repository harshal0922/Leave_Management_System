
/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Employee Controller
*/




package com.axis.leave.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.leave.entity.Employee;
import com.axis.leave.entity.Holiday;
import com.axis.leave.entity.Leave;
import com.axis.leave.entity.Project;
import com.axis.leave.service.IEmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
	@Autowired
	IEmployeeService empService;
	
	@GetMapping("view-leaves/{eid}")
	public List<Leave> viewAllLeaves(@PathVariable("eid") int eid){
		return empService.viewAllLeave(eid);		
	}
	@GetMapping("view-project/{eid}")
	public List<Project> viewEmployeeProject(@PathVariable("eid") int eid){
		return empService.getEmployeeProjectByEmpId(eid);		
	}
	@GetMapping("view-projectById/{pid}")
	public Project viewEmployeeProjectById(@PathVariable("pid") int pid){
		return empService.getEmployeeProjectById(pid);		
	}
	@GetMapping("/view-holiday")
	public List<Holiday> viewHoliday(){
		return empService.viewAllHoliday();
	}
	@GetMapping("/view-profile/{eid}")
	public Employee viewProfile(@PathVariable("eid") int eid){
		return empService.getById(eid);
	}
	@GetMapping("/view-balance-leaves/{empId}")
	public Employee viewBalanceLeaves(@PathVariable("empId") int eid){
		return empService.getById(eid);
		 
	}
	@PostMapping("/apply-for-leave")
	public ResponseEntity<String> applyForLeave(@RequestBody Leave leave) {
		System.out.println(leave);
		int empId=leave.getApplicantId();
		int hasError=0;
		Employee emp=empService.getById(empId);
		int manId = emp.getManId();
		leave.setManagerId(manId);
		String leaveType=leave.getType();
		int leavePeriod=leave.getPeriod();
		switch(leaveType) {
		case "SickLeave":
			if(emp.getSickLeave()<leavePeriod) {
				hasError=2;
				return new ResponseEntity<String>("you cant apply for the leave because your remaining sick leaves are "+emp.getSickLeave()+" and you applied for "+leavePeriod , HttpStatus.OK);
			}
			break;
		case "CasualLeave":
			if(emp.getCasualLeave()<leavePeriod) {
				hasError=2;
				return new ResponseEntity<String>("you cant apply for the leave because your remaining casual leaves are "+emp.getCasualLeave()+" and you applied for "+leavePeriod , HttpStatus.OK);
			}
			break;	
		case "PersonalLeave":
			if(emp.getPersonalLeave()<leavePeriod) {
				hasError=2;
				return new ResponseEntity<String>("you cant apply for the leave because your remaining personal leaves are "+emp.getPersonalLeave()+" and you applied for "+leavePeriod , HttpStatus.OK);
			}
			break;	
		case "MaternityLeave":
			if(emp.getMaternityLeave()<leavePeriod) {
				hasError=2;
				return new ResponseEntity<String>("you cant apply for the leave because your remaining maternity leaves are "+emp.getMaternityLeave()+" and you applied for "+leavePeriod , HttpStatus.OK);
			}
			break;	
		case "PaternityLeave":
			if(emp.getPaternityLeave()<leavePeriod) {
				hasError=2;
				return new ResponseEntity<String>("you cant apply for the leave because your remaining paternity leaves are "+emp.getPaternityLeave()+" and you applied for "+leavePeriod , HttpStatus.OK);
			}
			break;	
		case "MarriageLeave":
			if(emp.getMarriageLeave()<leavePeriod) {
				hasError=2;
				return new ResponseEntity<String>("you cant apply for the leave because your remaining marriage leaves are "+emp.getMarriageLeave()+" and you applied for "+leavePeriod , HttpStatus.OK);
			}
			break;	
		case "AdoptionLeave":
			hasError=2;
			if(emp.getAdoptionLeave()<leavePeriod) {
				return new ResponseEntity<String>("you cant apply for the leave because your remaining adoption leaves are "+emp.getAdoptionLeave()+" and you applied for "+leavePeriod , HttpStatus.OK);
			}
			break;	
		}
		if(hasError==0) {
				System.out.println(leave);
				empService.applyForLeave(leave);
			}
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
