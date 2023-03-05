import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebaseconfig"
import { useContext } from "react"
import { Authcontext } from "../contextProvider"


function Navbar(){
    const {currentUser} = useContext(Authcontext)
    return(
        <div className="Navbar">
            <Link className="Links" to="/home">Home</Link>
            <Link className="Links" to="/AboutUs">About Us</Link>
            <Link className="Links" to="/Members">Members</Link>
            <Link className="Links" to="/RegisteredEvents">RegisteredEvents</Link>
            <Link className="Links" to="/OurProjects">Our Projects</Link>
            {
                currentUser &&
                <input className="Links" type='button' onClick={(e)=>signOut()}  style={{backgroundColor:'transparent'}} value='logout'></input>
            }
            {
                !currentUser &&
                <Link className="Links" to="/login">Login</Link>
            }
        </div>
    )
}
export default Navbar