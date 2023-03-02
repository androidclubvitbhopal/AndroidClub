import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/home';
import AboutUs from "./pages/aboutUs"
import OurProjects from "./pages/OurProjects"
import Members from "./pages/members"
import RegisteredEvents from "./pages/registeredEvents"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/RegisteredEvents" element={<RegisteredEvents/>}></Route>
          <Route path="/Members" element={<Members/>}></Route>
          <Route path="/AboutUs" element={<AboutUs/>}></Route>
          <Route path="/OurProjects" element={<OurProjects/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
