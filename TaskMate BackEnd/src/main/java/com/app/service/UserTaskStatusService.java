package com.app.service;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.app.DTO.UserTaskDTO;
import com.app.entity.MyTask;
import com.app.entity.UserTaskStatus;


public interface UserTaskStatusService {	

	List<UserTaskStatus> getUserTaskStatusById(int userId);

	ResponseEntity<?> updateTaskStatus(int taskId, int userId, Boolean status);

	List<UserTaskStatus> getAllUserTask();

	List<UserTaskDTO> AllUserTasks();

}
