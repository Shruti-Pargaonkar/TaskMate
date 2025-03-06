package com.app.DTO;

public class UserTaskDTO {

	private String first_name;
    private String last_name;
    private String title;
    private boolean status;
    
    
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public UserTaskDTO(String first_name, String last_name, String title, boolean status) {
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.title = title;
		this.status = status;
	}
    
    public UserTaskDTO() 
    {}
}
