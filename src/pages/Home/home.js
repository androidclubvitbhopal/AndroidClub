import Navbar from "../../components/Navbar/Navbar"
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { getDocs, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../../contextProvider";
import homeBg from "../../images/home-bg.png"
import { Footer } from "../../components/Footer/Footer";
import "./home.css";
import gif from "../../images/android_gif.gif";
import gif2 from "../../images/gif2.webp";
import groupimg from "../../images/groupimg.jpg"
import logo2 from "../../images/logo_background.png"



function Home() {
    const navigate = useNavigate()
    const [UEvent, setUEvent] = useState([])
    const [CEvent, setCEvent] = useState([])
    const [vis, setVis] = useState("hidden")
    const { currentUser } = useContext(Authcontext)
    const [UserDetails, setDetails] = useState({})
    const [userEvents, setUserEvents] = useState([])
    const { Evpayment, setEvPay } = useContext(Authcontext)
    const [j, setj] = useState(null);
    let k = 0;
    const eventsRef = collection(db, "events");
    const usersRef = collection(db, "users");


    const FetchEvents = async () => {
        const q1 = query(eventsRef, where("completion", "==", false))
        const temp1 = []
        const querySnapShot1 = await getDocs(q1)
        try {
            querySnapShot1.forEach((doc) => {
                temp1.push(doc.data())
            })
            setUEvent(temp1)
        } catch (err) {
            console.log(err)
        }
        const q2 = query(eventsRef, where("completion", "==", true))
        const temp2 = []
        const querySnapShot2 = await getDocs(q2)
        try {
            querySnapShot2.forEach((doc) => {
                temp2.push(doc.data())
            })
            setCEvent(temp2)
        } catch (err) {
            console.log(err)
        }
    }


    const FetchUserDetails =async()=>{
        const q = query(usersRef,where('email','==',currentUser.email))
        const temp = []
        const querySnapShot = await getDocs(q)
        try{
            querySnapShot.forEach((doc)=>{
                temp.push(doc.data())
            })
            setDetails({ email: temp[0].email, name: `${temp[0].name}`, paymentVerified: "N", phone: `${temp[0].phone}`, regNo: `${temp[0].regNo}`, paymentImgURL: "", location: "" })
            setUserEvents(temp[0].allRegisteredEvents)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        FetchEvents()
        FetchUserDetails()

    }, [])
    useEffect(() => {
        if (UEvent[0] != null) {
            setj(true);
        }
        console.log(j)
    }, [UEvent])
    useEffect(() => {
        k = k + 1;
    }, [UserDetails])

    const HandleInit = (Event) => {
        setEvPay(Event)
        navigate("/Payments")
    }
    const HandleRegister = async (EventName) => {
        setVis("visible")
        let k = false
        const q = query(eventsRef, where("notificationGroup", "==", `${EventName}`))
        const querySnapShot = await getDocs(q)
        const temp = []
        try {
            querySnapShot.forEach((doc) => {
                temp.push(doc.data())
            })
            // setEv(temp)
            let RegEmails = temp[0]["Registered Emails"]
            for(let i=0;i<RegEmails.length;i++){
                if(RegEmails[i]==`${currentUser.email}`){
                    k = true;
                }
            }
            if(k){
                alert("You have Already Registered for this Event")
                navigate("/RegisteredEvents")
            }
            else{
                RegEmails = [...RegEmails, `${currentUser.email}`]
                if (k != 0) {
                    let RegInfo = temp[0]["Registered Users"]
                    RegInfo = [...RegInfo, UserDetails]
                    console.log(UserDetails)
                    let UserEvents = userEvents
                    UserEvents = [...UserEvents, { name: temp[0].name, description: temp[0].description, time: temp[0].time, bannerURL: temp[0].bannerURL, location: temp[0].location }]
                    await updateDoc(doc(db, "events", EventName), {
                        "Registered Emails": RegEmails,
                        "Registered Users": RegInfo,
                    }).then(async () => {
                        await updateDoc(doc(db, "users", currentUser.uid), {
                            allRegisteredEvents: UserEvents
                        })
                    })
                    k = 0;
                    navigate("/RegisteredEvents")
                    alert(`Registered for ${EventName}`)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    // for testing use only 

    // useEffect(() => {
    //     console.log(Ev)
    // }, [Ev])
    const explore = ()=>{
            window.scrollTo({
                top: 680,
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
                        <Link id='New' to='../Register'>Register</Link>
                        <input className="CancelBtn" type='button' onClick={() => { setVis("hidden") }} value='Close'></input>
                    </div>
                </div>
            }
            {/* css - backgroundImage:`url(${groupimg})` */}
            <Navbar />
            <img src={logo2} className="logo_2"></img>
            <div className="club-intro" style={{backgroundSize:'cover'}}>
                {/* <h1 className="first-heading"> <marquee behavior="scroll" direction="left" scrollamount="20"> Android club VIT Bhopal </marquee></h1> <br /> */}
                <h1 className="heading">Welcome to <br></br><div className="line2haeding"> Android Club. <marquee className='headingAnimation' behavior="scroll" direction="up" scrollamount='7'> Hackathons<br></br> Webinars<br></br> Events<br></br> Webinars<br></br> And much more!!</marquee></div></h1>
                <div className="club-intro-div">
                    {/* <img src={gif2} className="club-intro-img"  alt="gif" /> */}
                    <p className="club-intro-description">We at Android Club are driven to achieve excellence and solve problems while at it. Dedicated to educating and creating awareness about modern Mobile App development, we host workshops, hackathons, webinars, and all possible events under the sun, that help us build an inclusive community of like-minded people who explore and learn together. So, wear your thinking caps, put on some creativity, and let's develop some amazing apps!</p>
                </div>
                <button className="Explorebtn" onClick={()=>{explore()}}>Explore</button>
                {/* <div className="home-bg-div">
                </div> */}
            </div>
            <div className="upcoming-events">
                <p className='upcoming-events-heading'>All Upcoming Events</p>
                <div className="upcoming-events-container">
                    {j &&
                        UEvent.map((Events) => (
                            <div key={Math.random()} className="upcoming-event-block" onClick={() => { setVis("visible") }} style={{ backgroundImage: `url(${Events.bannerURL})` }}>
                                <div className="upcoming-event-info">
                                    <div className="upcoming-event-name">{Events.name}</div> <br />
                                    <p className="upcoming-event-mode" >Mode : {Events.location}</p>
                                    <p className="upcoming-event-description">Details : {Events.description}</p>
                                    <p className="upcoming-event-time">Time : {Events.time}</p>
                                    <p className="upcomin-event-price">Price : ₹{Events.price}</p>
                                </div>
                                {
                                    currentUser && Events.price == 0 &&
                                    <button className="RegisterBtn" onClick={() => { HandleRegister(Events.notificationGroup) }}><span type='text'>Register</span></button>
                                }
                                {
                                    currentUser && Events.price != 0 &&
                                    <button className="RegisterBtn" onClick={() => { HandleInit(Events) }}><span type='text'>Register</span></button>

                                }
                            </div>
                        ))
                    }
                    {!j &&
                        <div className="Event" onClick={() => { setVis("visible") }} style={{ background: 'green' }}>
                            <p className="EventName">No Events Scheduled as of Now <br></br>Come back later!!</p>
                        </div>
                    }
                </div>
            </div>
            <div className="completed-events">
                <p className='completed-events-heading'>Completed Events</p>
                <div className="completed-events-container">
                    {
                        CEvent.map((Events) => (
                            <div key={Math.random()} className="completed-event-block" onClick={() => { setVis("visible") }}>
                                <div className="completed-event-info">
                                    <img src={Events.bannerURL} className="completed-event-img" alt="" />
                                    <div className="completed-events-details">
                                        <div className="completed-event-name">{Events.name}</div>
                                        <p className="completed-event-description">{Events.description}</p>
                                        <p className="completed-event-summary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque perferendis sapiente vero veniam et hic voluptatibus quis quam voluptas blanditiis nulla, sequi ipsam a, enim voluptate, incidunt reiciendis dignissimos eius veritatis officiis sint repudiandae cum possimus. Ratione praesentium debitis similique laudantium ut vel, iure explicabo id, voluptas commodi eligendi dolorem.</p>
                                        <p className="completed-event-date">{Events.date}</p>
                                        <p className="completed-event-location"> Venue: {Events.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Home