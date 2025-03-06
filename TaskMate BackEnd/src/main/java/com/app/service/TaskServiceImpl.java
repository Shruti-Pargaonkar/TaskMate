package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.Dao.TaskDao;
import com.app.Dao.UserDao;
import com.app.Dao.UserTaskStatusDao;
import com.app.entity.MyTask;
import com.app.entity.User;
import com.app.entity.UserTaskStatus;

@Service
public class TaskServiceImpl implements TaskService{

	@Autowired
	private TaskDao tDao;
	
	@Autowired
	private UserDao uDao;
	
	@Autowired
	private UserTaskStatusDao utDao;
	
	@Override
	public List<MyTask> getTask() {
		// TODO Auto-generated method stub
		return tDao.findAll();
	}

	@Override
	public MyTask getTaskById(int id) {
		MyTask task = tDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

		return task;
	}
	
	@Override
	public MyTask newTask(MyTask tasks) {

		MyTask savedTask = tDao.save(tasks);
		
		//Assign new tasks to all existing users
		List<User> users = uDao.findAll();
		List<UserTaskStatus> userTaskStatuses = new ArrayList<>();
		
		
		for(User user : users)
		{
			UserTaskStatus status = new UserTaskStatus(savedTask, user, false);
			userTaskStatuses.add(status);
			
			
		}
		utDao.saveAll(userTaskStatuses);
		return savedTask;
	}
	
	@Override
	public MyTask updateTask(MyTask tasks, int id) {

		MyTask CurrentTask = tDao.findById(id).orElse(null);
		if(CurrentTask!=null)
		{
			CurrentTask.setTitle(tasks.getTitle());
			CurrentTask.setDescription(tasks.getDescription());
			return tDao.save(CurrentTask);
		}
		return null;
	}
	
	@Override
	public MyTask deleteTask(int id) {
		MyTask task = tDao.findById(id).orElse(null);
		if(task!=null)
		{
			tDao.delete(task);
		}
		return null;
	}
	

}
