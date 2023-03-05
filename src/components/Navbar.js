import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebaseconfig"


function Navbar(){
    return(
        <div className="Navbar">
            <Link className="Links" to="/home">Home</Link>
            <Link className="Links" to="/AboutUs">About Us</Link>
            <Link className="Links" to="/Members">Members</Link>
            <Link className="Links" to="/RegisteredEvents">RegisteredEvents</Link>
            <Link className="Links" to="/OurProjects">Our Projects</Link>
            <input className="Links" type='button' onClick={(e)=>signOut(auth)}  style={{backgroundColor:'transparent'}} value='logout'></input>
        </div>
    )
}
export default Navbar