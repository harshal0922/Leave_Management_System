/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Holiday Repository
*/

package com.axis.leave.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.leave.entity.Holiday;

public interface HolidayRepository extends JpaRepository<Holiday,Integer>{

}
