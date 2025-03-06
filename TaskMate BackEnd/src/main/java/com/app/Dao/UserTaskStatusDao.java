package com.app.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.app.entity.UserTaskStatus;

@Repository
public interface UserTaskStatusDao extends JpaRepository<UserTaskStatus, Integer> {

	List<UserTaskStatus> findByUserId(int userId);
	
	UserTaskStatus findByUserIdAndTaskId(int userId,int taskId);
}
