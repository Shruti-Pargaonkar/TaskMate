import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const CompletedTasks = () => {
    const [tasks, setTasks]=useState([]);
    const userId = localStorage.getItem('userId');
    const fetchData = async() =>
    {
        const res = await axios.get(`http://localhost:8080/tasks/userId/${userId}`)
        const compTask = res.data.filter(task=>task.status === true )
        // && task.user.id === 'userId'
        setTasks(compTask)
    }
    useEffect(()=>{
        fetchData();
    },[])
    return (
        <div>
            <h3>Completed Tasks</h3>
            <ListGroup>
                {tasks.length>0 ? (
                    <ol>
                    {tasks.map((taskStatus)=>(
                        <ListGroupItem>
                    
                                <li>{taskStatus.task.title}</li>
                            
                        </ListGroupItem>
                    ))}
                    </ol>
                ): (
                    <ListGroupItem>
                        None Task Completed!
                </ListGroupItem>
                )}
                 
            </ListGroup>
            <Link to="/user">
                <Button className='ms-auto d-block m-2'>Back To Tasks</Button>
            </Link>
        </div>
    )
}

export default CompletedTasks


