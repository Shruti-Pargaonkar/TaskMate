import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (loading) return;
        setLoading(true);

        try {
            if (!title || !description) {
                toast.warn("Title and Description are required!");
                setLoading(false);
                return;
            }
            console.log("User Id is: "+userId);
            const taskData = {
                title: title,
                description: description,
                completed: false,
                user: {
                    id: userId
                }
            };

            const res = await axios.post('http://localhost:8080/tasks', taskData);
            console.log("Task Data to be sent:", taskData);
            toast.success("Task added successfully!");
            console.log("Response from server:", res.data);
            setTitle('');
            setDescription('');
            navigate('/admin');
        } catch (err) {
            console.error("Error during Adding: ", err);
            toast.error("Failed to add task. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='card shadow p-4'>
                <h2>Add New Task</h2>
                <input 
                    className="form-control" 
                    type='text' 
                    value={title} 
                    placeholder='Title' 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    className="form-control" 
                    type='text' 
                    value={description} 
                    placeholder='Description' 
                    onChange={(e) => setDescription(e.target.value)} 
                />
                <Button variant='info' onClick={handleAdd} disabled={loading}>
                    {loading ? 'Adding Task...' : 'Add Task'}
                </Button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddTask;
