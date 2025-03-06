import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Table} from 'react-bootstrap';
import NavBar from './NavBar';

const CRUDTask = () => {


    const[Todo, setTodo]=useState([]);
    // const[title,setTitle]=useState("");
    // const[description,setDescription]=useState("");

    const getAll=async()=>
        {
            const allRes = await axios.get("http://localhost:8080/tasks")
            console.log(allRes.data)
            setTodo(allRes.data);
        }

        
        const handleDelete = async(id)=>
        {
            const confirmation = window.confirm("Do you want to delete a task?");
            if(confirmation)
            {
                try{
                    const delRes = await axios.delete(`http://localhost:8080/tasks/${id}`)
                    console.log(delRes.data);
                    getAll();
                }
                catch(err)
                {
                    alert("Task deleted successfully...")
                }
            }
            
        }
        useEffect(() => {   
                getAll();
            }, []);

    return (
        <div>
            <NavBar></NavBar>
            <div style={{display:'flex', justifyContent:'center'}} className='container'>
            <div style={{width:'75%', marginTop:'40px'}} className='card p-3 shadow'>
            <Link to="/add">
                <Button className='mb-2' variant='success'>Add Task</Button>
            </Link>
            <Table variant='primary' hover responsive bordered>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Todo.length > 0 ?
                    (Todo.map((todos)=>(
                        <tr key={todos.id}>
                            <td>{todos.title}</td>
                            <td>{todos.description}</td>
                            <td>
                                {/* <Button onClick={()=>AddTask()}>Add</Button>
                                <Button onClick={()=>EditTask(todos.id)}>Edit</Button>
                                <Button onSuonClickbmit={()=>delTask(todos.id)}>Delete</Button>  */}

                                    <div style={{display:'flex', justifyContent:'center'}}>
                                    
                                        <Link to={`/edit/${todos.id}`}>
                                            <Button className='me-2' variant='warning'>Edit</Button>
                                        </Link>
                                        <Button className='me-2' variant='danger' onClick={() => handleDelete(todos.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                    
                                
                            </td>
                        </tr>
                    ))):
                    (<tr>

                    </tr>)}
                </tbody>
            </Table>
            </div>
            </div>
        </div>
    )
}

export default CRUDTask
