import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import NavBar from './NavBar';

const SignUp = () => {
    const [first_name,setFirst_name]=useState("");
    const [last_name,setLast_name]=useState("");
    const [username,setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [role,setRole]=useState("");
    const [message,setMessage]=useState("");
    const [messageType,setMessageType]=useState("");
    const handleForm = async(e) =>
    {
        e.preventDefault();
        try
        {
            const registerRes = await axios.post(`http://localhost:8080/user/register`,{first_name, last_name, username, password, role},
                {
                    headers:
                    {
                        'Content-Type':'application/json'
                    }
                }
            )
            console.log(registerRes.data);
            if (registerRes.status === 200 || registerRes.status === 201 || registerRes.status === 204) {
                setMessage('Registration successfully...');
                setMessageType('success')
            }
        }
        catch(err)
        {
            setMessage('Username Exists!');
            setMessageType('danger')
        }
    }
    return (
        
        <div className="">
            <NavBar></NavBar>
            <div className={` alert alert-${messageType} mt-3`}>{message}</div>
            <div className='container col-8'>
            <div className="card p-4 border shadow bg bg-warning">
            <Form className='' onSubmit={handleForm}>
            <h4 >Register</h4>
            <Form.Control className='m-2' type="text" value={first_name} placeholder="First Name" onChange={(e)=>setFirst_name(e.target.value)} />
            <Form.Control className='m-2' type="text" value={last_name} placeholder="Last Name" onChange={(e)=>setLast_name(e.target.value)} />
            <Form.Control className='m-2' type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
            <Form.Control className='m-2' type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            {/* <Form.Label>Select Role:</Form.Label>
            <span></span> */}
            <Form.Select className='m-2' value={role} onChange={(e)=>setRole(e.target.value)} required>
                <option >Select Role</option>
                <option>User</option>
                <option>Admin</option>
            </Form.Select>
            <Button type='submit' className='m-2'>Register</Button>
            </Form>
            <p>Already Registered? <Link to={"/login"}>Login here</Link></p>
            </div>
            
            </div>
        </div>
    )
}

export default SignUp
