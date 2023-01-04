/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Project Repository
*/
package com.axis.leave.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.leave.entity.Project;

public interface ProjectRepository extends JpaRepository<Project,Integer>{

	List<Project> findByEmpId(int eid);

	Project getByEmpId(int eid);

}
