import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { getDocs,doc } from "firebase/firestore";
import PopUpWindow from "../components/PopUpRegistration";
import { Link } from "react-router-dom";
import { Authcontext } from "../contextProvider";

function Home(){
    const [Event,setEvent] = useState([])
    const [Ev,setEv] = useState([])
    const [vis,setVis] = useState("hidden")
    const {currentUser} = useContext(Authcontext)
    

    const usersRef = collection(db, "events");
    const FetchEvents = async ()=> {
        const q = query(usersRef)
        const temp = []
        const querySnapShot = await getDocs(q)
        try{
            querySnapShot.forEach((doc)=>{
                temp.push(doc.data())
            })
            setEvent(temp)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        FetchEvents()
    },[])
    useEffect(()=>{
        console.log(currentUser)
    },[currentUser])
    const HandleSubmit=(e)=>{
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const number = e.target[2].value
        const RgNo = e.target[3].value
        const gPay = e.target[4].files[0]

        setVis("hidden")
    }
    const HandleRegister= async (EventName)=>{
        setVis("visible")
        const q = query(usersRef,where("notificationGroup", "==", `${EventName}`))
        const querySnapShot = await getDocs(q)
        const temp = []
        try{
            querySnapShot.forEach((doc)=>{
                temp.push(doc.data())
            })
            setEv(temp)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="Home">
            {/* <PopUpWindow style={{visibility:`${vis}`}}/> */}
            <div className="PopUpWindow" onClick={()=>{setVis("hidden")}} style={{visibility:`${vis}`}}>
                <input className="CancelBtn" type='button' onClick={()=>{setVis("hidden")}} value='X'></input>
                {!currentUser && 
                    <div className="PopUpForm">
                        <p>Login In or Register to Access all features.</p>
                        <Link to='login'>Login</Link>
                        <Link to='Register'>Register</Link>
                    </div>
                }
            </div>

            <Navbar/>
            <div className="Events">
                {
                    Event.map((Events)=>(
                        <div className="Event" onClick={()=>{setVis("visible")}} style={{backgroundImage:`url(${Events.bannerURL})`}}>
                        {/* style={{visibility:`${vis}`}} onMouseEnter={()=>{setVis("visible")}} onMouseLeave={()=>{setVis("hidden")}} */}
                            <div className="moreInfo">
                                <div className="EventName">{Events.name}</div>
                                <p className="mode" style={{fontSize:'150%'}}><b>Location:  </b>{Events.location}</p>
                                <p className="description">{Events.description}</p>
                                <p className="time"><b>Time:  </b>{Events.time}</p>
                                <p className="Price"><b>Price:  ₹</b>{Events.price}</p>
                            </div>
                            <button className="RegisterBtn" onClick={()=>{HandleRegister(Events.notificationGroup)}}>Register</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Home