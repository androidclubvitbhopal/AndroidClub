import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import React, { useContext } from "react";
import Home from './pages/home';
import AboutUs from "./pages/aboutUs"
import OurProjects from "./pages/OurProjects"
import RegisteredEvents from "./pages/registeredEvents"
import { Register,Login } from './pages/register&Login';
import { Navigate } from 'react-router-dom';
import { Authcontext } from './contextProvider';
import Stream from './pages/EventStream';

function App() {
  const currentUser = useContext(Authcontext)
  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return(
        <Navigate to="/login"/>
      ) 
    }
    return(
      children
    )
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/Register" element={<Register/>}></Route>
          {/* <Route path='/' element={<Home2/>}></Route> */}
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/RegisteredEvents" element={<ProtectedRoute><RegisteredEvents/></ProtectedRoute>}></Route>
          <Route path="/AboutUs" element={<AboutUs/>}></Route>
          <Route path="/LiveStream" element={<Stream/>}></Route>
          <Route path="/OurProjects" element={<OurProjects/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
