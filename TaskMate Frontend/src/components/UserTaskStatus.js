import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';

const UserTaskStatus = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);

    const fetchUserTaskStatus = async () => {
        try {
            const res = await axios.get("http://localhost:8080/tasks/userStatus/showStatus");
            const allTasks = res.data;
            const completed = allTasks.filter(task => task.status);
            const pending = allTasks.filter(task => !task.status);

            setCompletedTasks(completed);
            setPendingTasks(pending);

            console.log("Completed Tasks:", completed);
            console.log("Pending Tasks:", pending);
        } catch (err) {
            console.error("Error fetching user task statuses:", err);
        }
    };

    useEffect(() => {
        fetchUserTaskStatus();
    }, []);

    return (
        <div>
            <h3>User Task Status:</h3>
            <div style={{float:'right'}}>
                <Link to="/admin">
                <Button variant='warning'>Go Back</Button>
                
                </Link>
                
            </div>
            <br></br>
            <div className='card shadow m-4'>
            <h5 style={{fontFamily:'cursive'}}>Completed Tasks</h5>
            <Table striped bordered hover variant='success'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Task</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {completedTasks.map((task, index) => (
                        <tr key={index}>
                            <td>{task.first_name}</td>
                            <td>{task.last_name}</td>
                            <td>{task.title}</td>
                            <td>Completed</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>

            <div className='card shadow m-4'>
            <h5 style={{fontFamily:'cursive'}}>Pending Tasks</h5>
            <Table striped bordered hover variant='warning'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Task</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingTasks.map((task, index) => (
                        <tr key={index}>
                            <td>{task.first_name}</td>
                            <td>{task.last_name}</td>
                            <td>{task.title}</td>
                            <td>Pending</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            
        </div>
    );
};

export default UserTaskStatus;
