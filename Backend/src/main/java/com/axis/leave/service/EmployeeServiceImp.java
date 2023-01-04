/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Employee Service Interface Implementation
*/
package com.axis.leave.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
public class EmployeeServiceImp implements IEmployeeService {

	@Autowired
	ProjectRepository projRepo;
	
	@Autowired
	LeaveRepository leaveRepo;
	
	@Autowired
	HolidayRepository holRepo;
	
	@Autowired
	EmployeeRepository empRepo;
	
	@Override
	public List<Project> getEmployeeProjectByEmpId(int eid) {
		// TODO Auto-generated method stub
		return projRepo.findByEmpId(eid);
	}

	@Override
	public List<Leave> viewAllLeave(int eid) {
		// TODO Auto-generated method stub
		return leaveRepo.findByApplicantId(eid);
	}

	@Override
	public List<Holiday> viewAllHoliday() {
		// TODO Auto-generated method stub
		return holRepo.findAll();
	}

	@Override
	public Leave applyForLeave(Leave leave) {
		return leaveRepo.save(leave);
	}

	@Override
	public Employee getById(int id) {
		// TODO Auto-generated method stub
		return empRepo.findById(id).orElse(null);
	}

	@Override
	public Project getEmployeeProjectById(int pid) {
		// TODO Auto-generated method stub
		return projRepo.findById(pid).orElse(null);
	}

	@Override
	public void deleteById(int eid) {
		// TODO Auto-generated method stub
		empRepo.deleteById(eid);
		
	}

}
