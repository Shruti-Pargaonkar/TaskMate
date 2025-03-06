package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.DTO.UserTaskDTO;
import com.app.Dao.TaskDao;
import com.app.Dao.UserDao;
import com.app.Dao.UserTaskStatusDao;
import com.app.entity.User;
import com.app.entity.UserTaskStatus;

@Service
public class UserTaskStatusImpl implements UserTaskStatusService{

	@Autowired
	private UserTaskStatusDao utDao;
	
	
	@Override
	public List<UserTaskStatus> getUserTaskStatusById(int userId) {
		// TODO Auto-generated method stub
		List<UserTaskStatus> userTasks = utDao.findByUserId(userId);
		if(userTasks.isEmpty())
		{
			throw new RuntimeException("No tasks found for this user");
		}
		return utDao.findByUserId(userId);
	}

	@Override
	public ResponseEntity<?> updateTaskStatus(int taskId, int userId, Boolean status) {
	    // Fetch the UserTaskStatus by userId and taskId
	    UserTaskStatus utStatus = utDao.findByUserIdAndTaskId(userId, taskId);

	    // Check if the task status record exists
	    if (utStatus == null) {
	        System.out.println("Task not found for userId: " + userId + " and taskId: " + taskId);
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found for this user and task ID.");
	    }

	    // Get the user associated with the task
	    User user = utStatus.getUser();
	    
	    // Check if the user is an admin
	    if (user != null && "ADMIN".equalsIgnoreCase(user.getRole())) {
	        System.out.println("Admin user cannot update task status. UserId: " + userId);
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Admin users cannot change task status.");
	    }

	    // Update and save the task status for regular users
	    System.out.println("Task Found! " + utStatus.getTask().getTitle());
	    utStatus.setStatus(status);
	    utDao.save(utStatus);
	    System.out.println("Updated status: " + utStatus.isStatus());
	    
	    return ResponseEntity.ok("Task Updated Successfully!");
	}

	@Override
	public List<UserTaskStatus> getAllUserTask() {
		// TODO Auto-generated method stub
		return utDao.findAll();
	}

	@Override
	public List<UserTaskDTO> AllUserTasks() {
	    List<UserTaskDTO> taskDTOs = new ArrayList<>();
	    
	    for (UserTaskStatus status : utDao.findAll()) {
	        UserTaskDTO dto = new UserTaskDTO(
	            status.getUser().getFirst_name(),
	            status.getUser().getLast_name(),
	            status.getTask().getTitle(),
	            status.isStatus()
	        );
	        taskDTOs.add(dto);
	    }
	    
	    return taskDTOs;
	}



}
