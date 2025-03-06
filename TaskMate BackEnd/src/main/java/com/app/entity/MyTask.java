package com.app.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Tasks")
public class MyTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;

	@OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
	@JsonIgnore
    private List<UserTaskStatus> taskStatuses = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<UserTaskStatus> getTaskStatuses() {
        return taskStatuses;
    }

    public void setTaskStatuses(List<UserTaskStatus> taskStatuses) {
        this.taskStatuses = taskStatuses;
    }

    public MyTask(int id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public MyTask() {
    }
}

