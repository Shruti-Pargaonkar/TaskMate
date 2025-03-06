package com.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UserTaskStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private boolean status; 
    

    @ManyToOne
    @JoinColumn(name = "task_id")
    private MyTask task;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


	public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public MyTask getTask() {
        return task;
    }

    public void setTask(MyTask task) {
        this.task = task;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public UserTaskStatus(MyTask task, User user, boolean status) {
        this.task = task;
        this.user = user;
        this.status = status;
    }

    public UserTaskStatus() {
    }
}
