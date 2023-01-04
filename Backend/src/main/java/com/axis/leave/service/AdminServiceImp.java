/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Admin Service Interface Implementation
*/
package com.axis.leave.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.axis.leave.entity.Employee;
import com.axis.leave.entity.Holiday;
import com.axis.leave.entity.Leave;
import com.axis.leave.entity.Project;
import com.axis.leave.repository.EmployeeRepository;
import com.axis.leave.repository.HolidayRepository;
import com.axis.leave.repository.LeaveRepository;
import com.axis.leave.repository.ProjectRepository;

@Service
public class AdminServiceImp implements IAdminService {

	@Autowired
	EmployeeRepository empRepo;
	@Autowired 
	HolidayRepository holidayRepo;
	
	@Autowired
	LeaveRepository leaveRepo;
	
	@Autowired
	ProjectRepository projRepo;
	
	
	@Override
	public List<Employee> viewAllEmployee() {
		// TODO Auto-generated method stub
		return empRepo.findAll();
	}

	@Override
	public Employee addEmployee(Employee emp) {
		// TODO Auto-generated method stub
		return empRepo.save(emp);
	}

	@Override
	public List<Holiday> viewAllHoliday() {
		// TODO Auto-generated method stub
		return holidayRepo.findAll();
	}

	@Override
	public Holiday addHoliday(Holiday holiday) {
		// TODO Auto-generated method stub
		return holidayRepo.save(holiday);
	}

	@Override
	public ResponseEntity<Employee> updateEmployee() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Project addProject(Project project) {
		// TODO Auto-generated method stub
		return projRepo.save(project);
	}

	@Override
	public ResponseEntity<Project> updateProject() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Employee getById(int id) {
		// TODO Auto-generated method stub
		return empRepo.findById(id).orElse(null);
	}


	@Override
	public ResponseEntity<Employee> deleteEmployee() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public boolean isValid(String email , String password) {
		Employee emp = empRepo.checkUserCredential(email, password);
		if(emp == null) {
			return false ;
		}
		return true ;
	}
	@Override
	public Employee findUser(String email , String password) {
		return empRepo.checkUserCredential(email, password);
	}
	@Override
	public List<Project> getEmployeeProject() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Leave> viewAllLeave() {
		// TODO Auto-generated method stub
		return leaveRepo.findAll();
	}

	@Override
	public Leave applyForLeave(Leave leave) {
		// TODO Auto-generated method stub
		return leaveRepo.save(leave);
	}

	@Override
	public Project getProjectByEmpId(int eid) {
		// TODO Auto-generated method stub
		return projRepo.getByEmpId(eid);
	}

}
