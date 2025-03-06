import Task from "./components/Task";
import CRUDTask from "./components/CRUDTask";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditTask from "./components/EditTask";
import DeleteTask from "./components/DeleteTask";
import AddTask from "./components/AddTask";
// import NavBar from "./components/NavBar";
// import { ThemeProvider } from 'react-bootstrap';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CompletedTasks from "./components/CompletedTasks";
import PendingTasks from "./components/PendingTasks";
import HomePage from "./components/HomePage";
// import CountUser from "./components/CountUser";
import UserTaskStatus from "./components/UserTaskStatus";

function App() {
  return (
    <div>
      {/* <NavBar></NavBar> */}
      
      
      
      
       {/* <ThemeProvider> */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/admin" element={<CRUDTask/>}></Route>
          <Route path="/register" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/user" element={<Task></Task>}></Route>
          <Route path="/add" element={<AddTask />} />

          <Route path="/edit/:id" element={<EditTask/>}></Route>
          <Route path="/del/:id" element={<DeleteTask/>}></Route>
          <Route path="/complete" element={<CompletedTasks/>}></Route>
          <Route path="/pending" element={<PendingTasks></PendingTasks>}></Route>
          {/* <Route path="/count" element={<CountUser></CountUser>}></Route> */}
          <Route path="/count" element={<UserTaskStatus></UserTaskStatus>}></Route>
        </Routes>
      </Router>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
