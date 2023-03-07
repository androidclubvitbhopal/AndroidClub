import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebaseconfig"
import { useContext } from "react"
import { Authcontext } from "../contextProvider"


function Navbar(){
    const {currentUser} = useContext(Authcontext)
    return(
        <div className="Navbar">
            <div className="ClName">Android Club</div>
            <Link className="Links" to="/home">Home</Link>
            <Link className="Links" to="/AboutUs">About Us</Link>
            {
                currentUser && 
                <Link className="Links" to="/RegisteredEvents">Registered Events</Link>
            }
            <Link className="Links" to="/OurProjects">Our Projects</Link>
            {
                currentUser && 
                <img src={`${currentUser.photoURL}`}></img>
            } 
            {
                currentUser &&
                <div>Akshay</div>
            }
            {
                !currentUser &&
                <Link className="Links" to="/login">Login</Link>
            }
        </div>
    )
}
export default Navbar