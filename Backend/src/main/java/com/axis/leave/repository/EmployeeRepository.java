/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Employee Repository
*/


package com.axis.leave.repository;

import javax.transaction.Transactional;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.axis.leave.entity.Employee;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

	@Query(nativeQuery = true , value = "select * from employee_table where EMAIL= :email AND PASSWORD= :password")
	public Employee checkUserCredential(@Param("email") String email , @Param("password") String password);
	
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE employee_table SET  sick_leave= SICK_LEAVE- :period where emp_id= :empId" , nativeQuery = true)
	public void updateSickLeave(@Param("period") int period , @Param("empId") int empId);
	
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE employee_table SET  casual_leave= CASUAL_LEAVE- :period where emp_id= :empId" , nativeQuery = true)
	public void updateCasualLeave(@Param("period") int period , @Param("empId") int empId);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE employee_table SET  personal_leave= PERSONAL_LEAVE- :period where emp_id= :empId" , nativeQuery = true)
	public void updatePersonalLeave(@Param("period") int period , @Param("empId") int empId);
	
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE employee_table SET  maternity_leave= MATERNITY_LEAVE- :period where emp_id= :empId" , nativeQuery = true)
	public void updateMaternityLeave(@Param("period") int period , @Param("empId") int empId);
	
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE employee_table SET  paternity_leave= PATERNITY_LEAVE- :period where emp_id= :empId" , nativeQuery = true)
	public void updatePaternityLeave(@Param("period") int period , @Param("empId") int empId);
	
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE employee_table SET  marriage_leave= MARRIAGE_LEAVE- :period where emp_id= :empId" , nativeQuery = true)
	public void updateMarriageLeave(@Param("period") int period , @Param("empId") int empId);
	
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE employee_table SET  adoption_leave= ADOPTION_LEAVE- :period where EMP_ID= :empId" , nativeQuery = true)
	public void updateAdoptionLeave(@Param("period") int period , @Param("empId") int empId);
}
