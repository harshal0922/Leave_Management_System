/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Manager Service Interface Implementation
*/

package com.axis.leave.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.axis.leave.entity.Holiday;
import com.axis.leave.entity.Leave;
import com.axis.leave.repository.EmployeeRepository;
import com.axis.leave.repository.HolidayRepository;
import com.axis.leave.repository.LeaveRepository;

@Service
public class ManagerServiceImp implements IManagerService {
	
	@Autowired
	HolidayRepository holidayRepo;
	
	@Autowired
	LeaveRepository leaveRepo;
	
	@Autowired
	EmployeeRepository empRepo;
	

	@Override
	public List<Holiday> viewAllHoliday() {
		// TODO Auto-generated method stub
		return holidayRepo.findAll();
	}

	@Override
	public List<Leave> viewAllLeaveByManagerId(int manId) {
		// TODO Auto-generated method stub
		return leaveRepo.findByManagerId(manId);
	}

	@Override
	public void respondApplication(int leaveId,String response) {
		// TODO Auto-generated method stub
		System.out.println("inside");
		System.out.println(response+leaveId);
		 leaveRepo.updateManagerResponse(response, leaveId);
		
	}

	@Override
	public Leave getLeaveById(int leaveId) {
		// TODO Auto-generated method stub
		return leaveRepo.findById(leaveId).orElse(null);
	}
public boolean subtractLeave(String leaveType, int period, int empId) {

		
		if (leaveType.equalsIgnoreCase("sickLeave")) {
			empRepo.updateSickLeave(period, empId);
			return true;
		} else if (leaveType.equalsIgnoreCase("casualLeave")) {
			empRepo.updateCasualLeave(period, empId);
			return true;
		} else if (leaveType.equalsIgnoreCase("personalLeave")) {
			empRepo.updatePersonalLeave(period, empId);
			return true;
		} else if (leaveType.equalsIgnoreCase("maternityLeave")) {
			empRepo.updateMaternityLeave(period, empId);
			return true;
		} else if (leaveType.equalsIgnoreCase("paternityLeave")) {
			empRepo.updatePaternityLeave(period, empId);
			return true;
		} else if (leaveType.equalsIgnoreCase("marriageLeave")) {
			empRepo.updateMarriageLeave(period, empId);
			return true;
		} else if (leaveType.equalsIgnoreCase("adoptionLeave")) {
			empRepo.updateAdoptionLeave(period, empId);
			return true;
		} else

			return false;
	}
	


}
