/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Admin Service Interface
*/

package com.axis.leave.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.axis.leave.entity.Employee;
import com.axis.leave.entity.Holiday;
import com.axis.leave.entity.Leave;
import com.axis.leave.entity.Project;

@Service
public interface IAdminService {

	public List<Employee> viewAllEmployee();
	public Employee addEmployee(Employee emp);
	public List<Holiday> viewAllHoliday();
	public Holiday addHoliday(Holiday holiday);
	public ResponseEntity<Employee> updateEmployee();
	public Project addProject(Project project);
	public ResponseEntity<Project> updateProject();
	public ResponseEntity<Employee> deleteEmployee();
	public List<Project> getEmployeeProject();
	public List<Leave> viewAllLeave();
	public Employee getById(int id);
	public Project getProjectByEmpId(int eid);
	
	
	public Leave applyForLeave(Leave leave);
	public abstract boolean isValid(String email , String password);
	public abstract Employee findUser(String email , String password);
	
	
	
	
	
}
