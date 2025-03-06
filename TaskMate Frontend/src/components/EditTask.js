import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {Table} from 'react-bootstrap';

const EditTask = () => {
    const {id}=useParams();
    // const[task, setTask] = useState([]);
    const[title, setTitle] = useState("");
    const[description,setDescription] = useState("");
    const navigate = useNavigate();

    const GetTask=async()=>
    {
        try{
            const fetchRes = await axios.get(`http://localhost:8080/tasks/${id}`);
            setTitle(fetchRes.data.title);
            setDescription(fetchRes.data.description);
        }
        catch(err)
        {
            console.log("Error while fetching: ",err)
        }
    }

    const editTask= async()=>
    {
        try{
            const editRes = await axios.put(`http://localhost:8080/tasks/${id}`,
            {title, description, completed:false})
            console.log("Task edited", editRes.data)
            navigate('/admin')
        }
        catch(err)
        {
            window.alert("Error while editing, ",err)
        }
    }
    useEffect(() => {
        GetTask();
    }, [id]);  //task only refetches if the URL ID changes.
    // Use [id] as the dependency.
    // This way, your task details will update correctly when the user clicks to edit a different task.

    // For example:

    // You click Edit Task 1 → it fetches Task 1’s data.
    // Then you click Edit Task 2 → the component re-renders and fetches Task 2’s data.
    // If you use [], the task details won't update when switching tasks.

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ marginTop: '40px', width:'75%' }} className='card shadow p-4'>
            <Table variant='warning' borderless responsive >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {task.length > 0?
                    (task.map((tasks) => (
                        <tr key={tasks.id}> */}
                    <tr>
                        <td>
                            <input className='form-control' type='text' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                        </td>
                        <td>
                            <input className='form-control' type='text' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                    <td colSpan={2}>
                        <Button variant='warning' onClick={editTask}>Edit</Button>
                    </td>
                    </tr>
                    {/* ))) : */}
                    {/* (<tr colspan={3}>
                        <td>"No data found"</td>
                    </tr>) */}
                    {/* } */}
                    
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default EditTask
