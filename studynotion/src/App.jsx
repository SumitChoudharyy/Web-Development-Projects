import { useState } from 'react'
import './App.css'
import { Link, Route, Routes,NavLink, useNavigate} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PrivateRoute from './components/PrivateRoute'



function App() {

  const[isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <div className='w-screen h-[100%] bg-richblack-900 flex flex-col'>
      {/* Importing the Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>


      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn}
        ></Home>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}></Login>}/>
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}></Signup>}/>
        <Route path="/dashboard" element={
          <PrivateRoute  isLoggedIn={isLoggedIn}>
            <Dashboard></Dashboard>
          </PrivateRoute>
          }/>

      </Routes>
    </div>
  )
}

export default App
