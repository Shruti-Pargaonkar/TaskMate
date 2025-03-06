package com.app.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.MyTask;
import com.app.entity.UserTaskStatus;

@Repository
public interface TaskDao extends JpaRepository<MyTask, Integer>{


}
