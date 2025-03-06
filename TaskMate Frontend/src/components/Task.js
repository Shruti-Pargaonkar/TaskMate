import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import NavBar from './NavBar';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');


    const fetchUserDetails = async()=>
    {
        try{
            const id=localStorage.getItem('userId');
            const res = await axios.get(`http://localhost:8080/user/id/${id}`);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
        }
        catch(err)
        {
            console.error("Error while fetching details: ",err);
        }
    }
    // Fetch tasks specific to the logged-in user
    const fetchTasks = async () => {
        try {
            const userId = localStorage.getItem('userId'); // Get user ID from localStorage
            if (!userId) {
                console.error("User ID not found!");
                return;
            }

            const taskData = await axios.get(`http://localhost:8080/tasks/userId/${userId}`);
            // const taskData = await axios.get(`http://localhost:8080/tasks`);
            
            console.log("Got the user-specific tasks!");
            console.log(taskData.data);
            setTasks(taskData.data);
        } catch (err) {
            console.error("Error at Fetching: ", err);
        }
    };

    const userId = localStorage.getItem('userId');
    // Handle the change in task completion status
    const handleChange = async (taskId, status) => {
        try {
            
            if (!userId) {
                console.error("User ID not found!");
                return;
            }

            // Optimistically update UI
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.task.id === taskId ? { ...task, status: !status } : task
                )
            );

            // Send the updated status to the backend
            await axios.put(
                `http://localhost:8080/tasks/${taskId}/status/${userId}`,
                !status,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert("Task status updated!");

            // Refresh tasks to make sure data is consistent
            fetchTasks();
        } catch (err) {
            console.error("Error updating task:", err);
            fetchTasks(); // Revert UI if there's an error
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchUserDetails();
    }, []);

    return (
        <div>
            <NavBar />
            <div style={{fontFamily:'cursive'}}>
                <h4>Welcome!</h4>
                <h6>{first_name} {last_name},</h6>
            </div>
            <div className="card p-4 shadow">
                <h1 className="">Tasks</h1>
                <Table variant="primary" responsive borderless>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((taskStatus) => (
                                <tr key={taskStatus.id}>
                                    <td>{taskStatus.task.title}</td>
                                    <td>{taskStatus.task.description}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={taskStatus.status}
                                            onChange={() => handleChange(taskStatus.task.id, taskStatus.status)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No tasks found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Task;

