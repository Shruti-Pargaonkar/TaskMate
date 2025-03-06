import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PendingTasks = () => {
    const userId = localStorage.getItem('userId');
    const [tasks,setTasks]=useState([])
    const fetchData = async() =>
    {
        
        const res = await axios.get(`http://localhost:8080/tasks/userId/${userId}`)
        const pendingTask = res.data.filter(task=>task.status === false)
        //  && task.user.id === 'userId'
        setTasks(pendingTask)
    }
    useEffect (()=>
    {
        fetchData();
    },[])
    return (
        <div>
            <h3>Pending Tasks</h3>
            <ListGroup>
                {tasks.length>0 ? (
                    (tasks.map(taskStatus=>(
                        <ListGroupItem>
                            {taskStatus.task.title}
                        </ListGroupItem>
                    )))
                ) : (
                    <ListGroupItem>
                        None Tasks Pending!
                    </ListGroupItem>
                )}
            </ListGroup>
            <Link to="/user">
                <Button className='ms-auto d-block m-2'>Back To Tasks</Button>
                </Link>
        </div>
    )
}

export default PendingTasks
