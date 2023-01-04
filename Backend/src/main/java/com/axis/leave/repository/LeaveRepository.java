/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Leave Repository
*/

package com.axis.leave.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.axis.leave.entity.Leave;

@Repository
public interface LeaveRepository extends JpaRepository<Leave,Integer>{
	
	
	List<Leave> findByApplicantId(int eid);
	
	List<Leave> findByManagerId(int manId);
	
//	@Modifying
//	@Query("UPDATE Leave l SET l.managerResponse= ?1 WHERE l.leaveId= ?2")
	@Modifying
	@Transactional
	@Query(value ="UPDATE leave_table SET  manager_response= :response WHERE leave_id = :leaveId",nativeQuery=true)
	void updateManagerResponse(String response,int leaveId);
}
