import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/home';
import AboutUs from "./pages/aboutUs"
import ContactUs from "./pages/contactUs"
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
          <Route path="/ContactUs" element={<ContactUs/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
