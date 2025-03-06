package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.entity.MyTask;

public interface TaskService {

	public List<MyTask> getTask();
	
	public MyTask getTaskById(int id);
	
	public MyTask newTask(MyTask tasks);
	
	public MyTask updateTask(MyTask tasks,int id);
	
	public MyTask deleteTask(int id);

}
