import React from 'react'
import { Nav } from 'react-bootstrap'
import { useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        navigate('/login');
    };
    return (
        <div>
            <div className='border border-primary card shadow-lg p-4 mb-2 bg-warning'>
             <Nav  className="flex-row">
             
                {/* <div style={{display:'flex', justifyContent:'center'}}> */}
                {/* {location.pathname !== '/admin' && (
                <Nav.Link as={NavLink} className='bg-light rounded ms-2' to="/user">MyTasks</Nav.Link>
                )} */}

                <div className='d-flex justify-content-between w-100'>

                <div className='d-flex'>
                <h3>TaskMate</h3>
                </div>

                <div className='d-flex'>
                { location.pathname === '/admin' && (
                <Nav.Link as={NavLink} className='ms-2' activeClassName="active" to="/count">User</Nav.Link>
                )}
                {location.pathname === '/register' || location.pathname === '/login' || location.pathname!=='/admin' && 
                (<Nav.Link as={NavLink} className='ms-2' activeClassName="active" to="/complete">Completed</Nav.Link>)}

                {location.pathname === '/register' || location.pathname === '/login' || location.pathname!=='/admin' &&  
                (<Nav.Link as={NavLink} className='ms-2' activeClassName="active" to="/pending">Pending</Nav.Link>)}

                {location.pathname !== '/register' || location.pathname !== '/login' || location.pathname!=='/admin' &&  
                (<Nav.Link as={NavLink} className='ms-2' onClick={handleLogout} activeClassName="active" to="/">Logout</Nav.Link>)}
                </div>

                </div>
                {/* </div> */}
            </Nav>
            </div>
        </div>
    )
}

export default NavBar
