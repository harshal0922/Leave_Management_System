/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Leave Repository
*/
package com.axis.leave.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="leave_table")
public class Leave {
	
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private int leaveId;
		private int applicantId;
		private String applicantName;
		private String title;
		private String email;
		private String type;
		private LocalDate startDate;
		private LocalDate endDate;
		private int managerId;
		private int period;
		private String role;
		private String reason;
		private String managerResponse="Pending";
		public Leave() {
			super();
		}
		
		
		public int getManagerId() {
			return managerId;
		}


		public void setManagerId(int managerId) {
			this.managerId = managerId;
		}


		


		public Leave(int leaveId, int applicantId, String applicantName, String title, String email, String type,
				LocalDate startDate, LocalDate endDate, int managerId, int period, String role, String reason,
				String managerResponse) {
			super();
			this.leaveId = leaveId;
			this.applicantId = applicantId;
			this.applicantName = applicantName;
			this.title = title;
			this.email = email;
			this.type = type;
			this.startDate = startDate;
			this.endDate = endDate;
			this.managerId = managerId;
			this.period = period;
			this.role = role;
			this.reason = reason;
			this.managerResponse = managerResponse;
		}


		public String getApplicantName() {
			return applicantName;
		}


		public void setApplicantName(String applicantName) {
			this.applicantName = applicantName;
		}


		public int getLeaveId() {
			return leaveId;
		}

		public void setLeaveId(int leaveId) {
			this.leaveId = leaveId;
		}

		public int getApplicantId() {
			return applicantId;
		}
		public void setApplicantId(int applicantId) {
			this.applicantId = applicantId;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public LocalDate getStartDate() {
			return startDate;
		}
		public void setStartDate(LocalDate startDate) {
			this.startDate = startDate;
		}
		public LocalDate getEndDate() {
			return endDate;
		}
		public void setEndDate(LocalDate endDate) {
			this.endDate = endDate;
		}
		public int getPeriod() {
			return period;
		}
		public void setPeriod(int period) {
			this.period = period;
		}
		public String getRole() {
			return role;
		}
		public void setRole(String role) {
			this.role = role;
		}
		public String getReason() {
			return reason;
		}
		public void setReason(String reason) {
			this.reason = reason;
		}
		public String getManagerResponse() {
			return managerResponse;
		}
		public void setManagerResponse(String managerResponse) {
			this.managerResponse = managerResponse;
		}


		@Override
		public String toString() {
			return "Leave [leaveId=" + leaveId + ", applicantId=" + applicantId + ", applicantName=" + applicantName
					+ ", title=" + title + ", email=" + email + ", type=" + type + ", startDate=" + startDate
					+ ", endDate=" + endDate + ", managerId=" + managerId + ", period=" + period + ", role=" + role
					+ ", reason=" + reason + ", managerResponse=" + managerResponse + "]";
		}



		
		
	
		
		
		
}
