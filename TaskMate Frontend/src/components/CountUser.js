import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CountUser = () => {
    // const [username, setUsername]=useState('');
    // const [password, setPassword]=useState('');
    const [tasks,setTasks]=useState([]);
    // const [status, setStatus]=useState('');
    const showUsers=async()=>
    {
        const userData = await axios.get(`http://localhost:8080/user`)
        setTasks(userData.data);
    }
    useEffect(()=>{
        showUsers();
    },[])
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className=' card shadow w-50'>
                <Table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            {/* <th>Password</th> */}
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length>0 ? (tasks.map((task)=>(
                            <tr key={task.id}>
                                <td>{task.username}</td>
                                {/* <td>{task.}</td> */}
                                <td></td>
                            </tr>
                        ))) 
                        :
                        (<tr>
                            <td colSpan="2">No Users Found</td>
                        </tr>)
                        }
                        
                    </tbody>
                </Table>
                <div className='d-flex justify-content-end'>
                    <Link to='/admin'>
                        <Button className='m-2' type='submit'>Go Back</Button>
                    </Link>
                </div>
            </div>
            
                
            
        </div>
    )
}

export default CountUser
