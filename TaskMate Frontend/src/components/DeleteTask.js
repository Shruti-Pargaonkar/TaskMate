import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeleteTask = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    const getAll = async () => {
        try {
            const allRes = await axios.get("http://localhost:8080/tasks");
            setTasks(allRes.data);
        } catch (err) {
            console.error("Error during fetch: ", err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you really want to delete this task?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/tasks/${id}`);
                alert("Task deleted successfully!");
                getAll(); // Refresh the list after deletion
                navigate('/');
            } catch (err) {
                console.error("Error during deletion: ", err);
            }
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div>
            <h2>Delete a Task</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No tasks found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteTask;
