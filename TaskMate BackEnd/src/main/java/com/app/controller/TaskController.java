package com.app.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.UserTaskDTO;
import com.app.entity.MyTask;
import com.app.entity.UserTaskStatus;
import com.app.service.TaskService;
import com.app.service.UserService;
import com.app.service.UserTaskStatusService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tasks")
public class TaskController {


	@Autowired
	private TaskService tService;

	@Autowired
	private UserTaskStatusService utService;
	
	
	@GetMapping
	public List<MyTask> getAll()
	{
		return tService.getTask();
	}
	
	@GetMapping("/{id}")
	public MyTask getById(@PathVariable int id)
	{
		return tService.getTaskById(id);
	}
	
	//Admin creates a task
	@PostMapping
	public MyTask createTask(@RequestBody MyTask tasks)
	{
		return tService.newTask(tasks);
	}
	
	@PutMapping("{id}")
	public MyTask updateTask(@RequestBody MyTask tasks, @PathVariable int id)
	{
		return tService.updateTask(tasks, id);
	}
	
	@DeleteMapping("/{id}")
	public MyTask deleteTask(@PathVariable int id)
	{
		return tService.deleteTask(id);
	}
	
	
	//for Users and their tasks
	@GetMapping("/userId/{userId}")
	public List<UserTaskStatus> getByUserId(@PathVariable int userId)
	{
		return utService.getUserTaskStatusById(userId);
	}
	
	//update task status
	@PutMapping("/{taskId}/status/{userId}")
	public ResponseEntity<?> updateTaskStatus(@PathVariable int taskId, @PathVariable int userId, @RequestBody Boolean status)
	{
//		boolean status = reqBody.get("status");
		return utService.updateTaskStatus(taskId,userId,status);
	}
	
	//Get All User and their tasks
	@GetMapping("/taskUser")
	public List<UserTaskStatus> getAllUserTask()
	{
		return utService.getAllUserTask();
	}
	
	
	//TO get first, last name, title, status of user
	@GetMapping("/userStatus/showStatus")
	public List<UserTaskDTO> userTasks()
	{
		return utService.AllUserTasks();
	}
	
	

	
	
	
}
