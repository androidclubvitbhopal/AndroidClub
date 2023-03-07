import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebaseconfig"
import { useContext } from "react"
import { Authcontext } from "../contextProvider"
import { useState } from "react"


function Navbar(){
    const {currentUser} = useContext(Authcontext)
    const [vis,setVis] = useState("hidden")
    return(
        <>
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
                    <div className="Name">{currentUser.displayName}</div>
                }
                {
                    currentUser && 
                    <img src={`${currentUser.photoURL}`} style={{cursor:'pointer'}} onClick={()=>setVis("visible")}></img>
                } 
                {
                    !currentUser &&
                    <Link className="Links" to="/login">Login</Link>
                }
            </div>
            <div className="PopUpWindow" onClick={()=>{setVis("hidden")}} style={{visibility:`${vis}`}}>
                <div className="UserPopUpForm">
                    <input type='button' onClick={()=>{signOut(auth)}} value='Logout'></input>
                </div>
            </div>
        </>
    )
}
export default Navbar