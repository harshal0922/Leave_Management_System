/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Employee Entity
*/

package com.axis.leave.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="employee_table")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int empId;
	private String empName;
	private String password;
	private String email;
	private LocalDate dateOfBirth;
	private String role;
	private int managerId=18;
	private String contactNumber;
	private String designation;
	private int sickLeave=15;
	private int casualLeave=15;
	private int personalLeave=15;
	private int maternityLeave=180;
	private int paternityLeave=30;
	private int marriageLeave=15;
	private int adoptionLeave=30;
	public Employee() {
		super();
	}
	public Employee(int empId, String empName, String email, String role,int manId, String password, LocalDate dateOfBirth, String contactNumber,
			String designation, int sickLeave, int casualLeave, int personalLeave, int maternityLeave,
			int paternityLeave, int marriageLeave, int adoptionLeave) {
		super();
		this.empId = empId;
		this.empName = empName;
		this.email = email;
		this.password = password;
		this.dateOfBirth = dateOfBirth;
		this.role=role;
		this.managerId=manId;
		this.contactNumber = contactNumber;
		this.designation = designation;
		this.sickLeave = sickLeave;
		this.casualLeave = casualLeave;
		this.personalLeave = personalLeave;
		this.maternityLeave = maternityLeave;
		this.paternityLeave = paternityLeave;
		this.marriageLeave = marriageLeave;
		this.adoptionLeave = adoptionLeave;
	}
	public int getEmpId() {
		return empId;
	}
	public void setEmpId(int empId) {
		this.empId = empId;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public int getManId() {
		return managerId;
	}
	public void setManId(int manId) {
		this.managerId = manId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public int getSickLeave() {
		return sickLeave;
	}
	public void setSickLeave(int sickLeave) {
		this.sickLeave = sickLeave;
	}
	public int getCasualLeave() {
		return casualLeave;
	}
	public void setCasualLeave(int casualLeave) {
		this.casualLeave = casualLeave;
	}
	public int getPersonalLeave() {
		return personalLeave;
	}
	public void setPersonalLeave(int personalLeave) {
		this.personalLeave = personalLeave;
	}
	public int getMaternityLeave() {
		return maternityLeave;
	}
	public void setMaternityLeave(int maternityLeave) {
		this.maternityLeave = maternityLeave;
	}
	public int getPaternityLeave() {
		return paternityLeave;
	}
	public void setPaternityLeave(int paternityLeave) {
		this.paternityLeave = paternityLeave;
	}
	public int getMarriageLeave() {
		return marriageLeave;
	}
	public void setMarriageLeave(int marriageLeave) {
		this.marriageLeave = marriageLeave;
	}
	public int getAdoptionLeave() {
		return adoptionLeave;
	}
	public void setAdoptionLeave(int adoptionLeave) {
		this.adoptionLeave = adoptionLeave;
	}
	@Override
	public String toString() {
		return "Employee [empId=" + empId + ", empName=" + empName + ", password=" + password + ", email=" + email
				+ ", dateOfBirth=" + dateOfBirth + ", role=" + role + ", managerId=" + managerId + ", contactNumber="
				+ contactNumber + ", designation=" + designation + ", sickLeave=" + sickLeave + ", casualLeave="
				+ casualLeave + ", personalLeave=" + personalLeave + ", maternityLeave=" + maternityLeave
				+ ", paternityLeave=" + paternityLeave + ", marriageLeave=" + marriageLeave + ", adoptionLeave="
				+ adoptionLeave + "]";
	}
	
	
	
	
	

}
