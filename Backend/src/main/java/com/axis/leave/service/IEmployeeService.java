
/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Employee Service Interface
*/

package com.axis.leave.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.axis.leave.entity.Employee;
import com.axis.leave.entity.Holiday;
import com.axis.leave.entity.Leave;
import com.axis.leave.entity.Project;

@Service
public interface IEmployeeService {
	public List<Project> getEmployeeProjectByEmpId(int eid);
	public List<Leave> viewAllLeave(int eid);
	public List<Holiday> viewAllHoliday();
	public Leave applyForLeave(Leave leave);
	public Employee getById(int id);
	public Project getEmployeeProjectById(int pid);
	
	public void deleteById(int eid);

}
