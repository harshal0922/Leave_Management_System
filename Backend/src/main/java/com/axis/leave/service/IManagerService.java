/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Manager Service Interface
*/


package com.axis.leave.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.axis.leave.entity.Holiday;
import com.axis.leave.entity.Leave;

@Service
public interface IManagerService {
	
	public List<Holiday> viewAllHoliday();
	public List<Leave> viewAllLeaveByManagerId(int manId);
	public void respondApplication(int leaveId, String response);
	public boolean subtractLeave(String leaveType, int period, int empId);
	public Leave getLeaveById(int leaveId);
	
	

}
