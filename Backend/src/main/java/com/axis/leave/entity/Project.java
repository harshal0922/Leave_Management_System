/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Project Entity
*/


package com.axis.leave.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="project_table")
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int projId;
	private int empId;
	private String empName;
	private String title;
	private String type;
	private String status;
	private String description;
	private String startDate;
	private String endDate;
	public Project() {
		super();
	}
	
	public Project(int projId, int empId, String empName, String title, String type, String status, String description,
			String startDate, String endDate) {
		super();
		this.projId = projId;
		this.empId = empId;
		this.empName = empName;
		this.title = title;
		this.type = type;
		this.status = status;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public int getProjId() {
		return projId;
	}

	public void setProjId(int projId) {
		this.projId = projId;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String name) {
		this.empName = name;
	}

	public int getPid() {
		return projId;
	}
	public void setPid(int projId) {
		this.projId = projId;
	}
	public int getEmpId() {
		return empId;
	}
	public void setEmpId(int empId) {
		this.empId = empId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	@Override
	public String toString() {
		return "Project [projId=" + projId + ", empId=" + empId + ", empName=" + empName + ", title=" + title
				+ ", type=" + type + ", status=" + status + ", description=" + description + ", startDate=" + startDate
				+ ", endDate=" + endDate + "]";
	}
	
	
	
	
	
}
