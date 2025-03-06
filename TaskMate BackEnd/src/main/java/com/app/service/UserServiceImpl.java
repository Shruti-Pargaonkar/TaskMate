package com.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.Dao.TaskDao;
import com.app.Dao.UserDao;
import com.app.Dao.UserTaskStatusDao;
import com.app.entity.MyTask;
import com.app.entity.User;
import com.app.entity.UserTaskStatus;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private TaskDao taskDao;
	
	@Autowired
	private UserTaskStatusDao utDao;
	
	@Override
	public List<User> getUser() {
		// TODO Auto-generated method stub
		return userDao.findAll();
	}

	@Override
	public Optional<User> getUserById(int id) {
		// TODO Auto-generated method stub
		return userDao.findById(id);
	}

	@Override
	public User newUser(User user) {
		// TODO Auto-generated method stub
	User savedUser = userDao.save(user);
	
	//Assign all exisiting tasks to new user
	List<MyTask> allTasks = taskDao.findAll();
	List<UserTaskStatus> userTaskStatuses = new ArrayList<>();
	
	for(MyTask task: allTasks)
	{
		UserTaskStatus status = new UserTaskStatus(task, savedUser, false);
		userTaskStatuses.add(status);
	}
		utDao.saveAll(userTaskStatuses);
		return savedUser;
	}

	@Override
	public User deleteUser(int id) {
		// TODO Auto-generated method stub
		User user = userDao.findById(id).orElse(null);
		if(user!=null)
		{
			userDao.delete(user);
		}
		return user;
	}

	@Override
	public User updateUser(int id, User user) {
		// TODO Auto-generated method stub
		User u1 = userDao.findById(id).orElse(null);
		if(u1!=null)
		{
			u1.setFirst_name(user.getFirst_name());
			u1.setLast_name(user.getLast_name());
			u1.setUsername(user.getUsername());
			u1.setPassword(user.getPassword());
			u1.setRole(user.getRole());
			
			userDao.save(u1);
		}
		System.out.println("User updated successfully");
		return user;
	}

	@Override
	public ResponseEntity<String> registerUser(User user) {
		if(userDao.findByUsername(user.getUsername())!=null)
		{
			return ResponseEntity.badRequest().body("username exists");
		}
		User savedUser = userDao.save(user);
		
		//Fetch all tasks and assign them to user
		List<MyTask> allTasks = taskDao.findAll();
		List<UserTaskStatus> userTaskStatuses = new ArrayList<>();
		for(MyTask task:allTasks)
		{
			UserTaskStatus status = new UserTaskStatus(task, savedUser, false);
			userTaskStatuses.add(status);
		}
		utDao.saveAll(userTaskStatuses);
		return ResponseEntity.ok("Registered successfully");
	}

	@Override
	public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
	    User user = userDao.findByUsername(loginRequest.getUsername());

	    if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
	        // Creates a structured JSON response
	        Map<String, Object> response = new HashMap<>();
	        response.put("message", "Login Successful");
	        response.put("role", user.getRole());
	        response.put("userId", user.getId());

	        return ResponseEntity.ok(response);
	    } else {
	        return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials"));
	    }
	}

	
	

}
