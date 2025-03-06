package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.app.entity.User;

public interface UserService {

	public List<User> getUser();
	
	public Optional<User> getUserById(int id);
	
	public User newUser(User user);
	
	public User deleteUser(int id);
	
	public User updateUser(int id, User user);
	
	public ResponseEntity<String> registerUser(User user);
	
	public ResponseEntity<?> loginUser(User user);
	
}
