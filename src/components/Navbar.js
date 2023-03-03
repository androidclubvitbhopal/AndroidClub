import { Link } from "react-router-dom"


function Navbar(){
    return(
        <div className="Navbar">
            <Link className="Links" to="/home">Homes!</Link>
            <Link className="Links" to="/AboutUs">About Us</Link>
            <Link className="Links" to="/Members">Members</Link>
            <Link className="Links" to="/RegisteredEvents">RegisteredEvents</Link>
            <Link className="Links" to="/OurProjects">Our Projects</Link>
        </div>
    )
}
export default Navbar