import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer";
import logo1 from "../../images/logo_3.png"
import "./home.css";
// import UpcomingEvents from "./UpcomingEvents";
import { useContext, useState } from "react";
import { Authcontext } from "../../contextProvider";
import Events from "./Events";





function Home() {
    const [vis, setVis] = useState("hidden");
    const { currentUser } = useContext(Authcontext);

    const explore = () => {
        window.scrollTo({
            top: 730,
            behavior: 'smooth',
        });
    }
    
    return (

        <div className="Home" id="H">
            {
                !currentUser &&
                <div className="PopUpWindow" onClick={() => { setVis("hidden") }} style={{ visibility: `${vis}` }}>
                    <div className="PopUpForm">
                        <p>Hey Learner!! <br></br>Login In or Register to Access all features.</p>
                        <Link id='New' to='../login'>Login</Link>
                        <Link id='New1' to='../Register'>Register</Link>
                        <input className="CancelBtn" type='button' onClick={() => { setVis("hidden") }} value='Close'></input>
                    </div>
                </div>
            }
            <Navbar />
            <img src={logo1} className="logo_1" alt="logo1"></img>
            <div className="club-intro" style={{backgroundSize:'cover'}}>
                <h1 className="heading">Welcome to <br></br><div className="line2haeding"> Android Club. <marquee className='headingAnimation' behavior="scroll" direction="up" scrollamount='7'> Hackathons<br></br> Events<br></br> Webinars<br></br> And much more!!</marquee></div></h1>
                <div className="club-intro-div">
                    <p className="club-intro-description">We at Android Club are driven to achieve excellence and solve problems while at it. Dedicated to educating and creating awareness about modern Mobile App development, we host workshops, hackathons, webinars, and all possible events under the sun, that help us build an inclusive community of like-minded people who explore and learn together. So, wear your thinking caps, put on some creativity, and let's develop some amazing apps!</p>
                </div>
                <button className="Explorebtn" onClick={()=>{explore()}}>Explore</button>
            </div>
            <Events/>
            <Footer />
        </div>
    )
}
export default Home