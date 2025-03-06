package com.app.controller;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.User;
import com.app.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService Uservice;
	
	@GetMapping
	public List<User> getAllUsers()
	{
		return Uservice.getUser();
	}
	
	@GetMapping("/id/{id}")
	public Optional<User> getUserById(@PathVariable int id)
	{
		return Uservice.getUserById(id);
	}
	
	@PostMapping
	public User createUser(@RequestBody User user)
	{
		return Uservice.newUser(user);
	}
	
	@PutMapping("/{id}")
	public User updateUser(@PathVariable int id, @RequestBody User user)
	{
		return Uservice.updateUser(id, user);
	}
	
	@DeleteMapping("/{id}")
	public User deleteUser(@PathVariable int id)
	{
		return Uservice.deleteUser(id);
	}
	
	
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User user)
	{
		System.out.println("User Role: " + user.getRole());
		return Uservice.registerUser(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User user)
	{
		return Uservice.loginUser(user);
	}
	
	
}
