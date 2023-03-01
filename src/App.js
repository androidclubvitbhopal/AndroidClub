import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
