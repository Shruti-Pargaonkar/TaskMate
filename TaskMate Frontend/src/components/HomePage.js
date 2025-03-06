import React from 'react'
import { Nav } from 'react-bootstrap'

const HomePage = () => {
    return (
        <div>
             <div className='border border-primary card shadow-lg p-4 mb-4'>
             <Nav  className="flex-row">
                <h3>TaskMate</h3>
                <div style={{display:'flex', justifyContent:'center'}}>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                </div>
            </Nav>
            </div>
        </div>
    )
}

export default HomePage
