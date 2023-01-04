/**
 * Project Name : Leave Management Portal
 * Date of Starting : 02/01/2023
 * Date of Completion : 04/01/2023
 * Author Name : Harshal Patil
 * About this Page : Holiday Entity
*/

package com.axis.leave.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="holiday_table")
public class Holiday {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int holidayId;
	private String date;
	private String description;
	public Holiday() {
		super();
	}
	
	public int getHolidayId() {
		return holidayId;
	}

	public void setHolidayId(int holidayId) {
		this.holidayId = holidayId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Holiday(int holidayId, String date, String description) {
		super();
		this.holidayId = holidayId;
		this.date = date;
		this.description = description;
	}

	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDesc() {
		return description;
	}
	public void setDesc(String desc) {
		this.description = desc;
	}
	@Override
	public String toString() {
		return "Holiday [holidayId=" + holidayId + ", date=" + date + ", description=" + description + "]";
	}
	
	

}
