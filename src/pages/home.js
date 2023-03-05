import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { getDocs,doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Authcontext } from "../contextProvider";

function Home(){
    const [Event,setEvent] = useState([])
    const [Ev,setEv] = useState({})
    const [vis,setVis] = useState("hidden")
    const {currentUser} = useContext(Authcontext)
    const [UserDetails,setDetails] = useState({})
    

    const eventsRef = collection(db, "events");
    const usersRef = collection(db, "users");
    const FetchEvents = async ()=> {
        const q = query(eventsRef)
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
    const FetchUserDetails =async()=>{
        const q = query(usersRef,where('email','==',currentUser.email))
        const temp = []
        const querySnapShot = await getDocs(q)
        try{
            querySnapShot.forEach((doc)=>{
                temp.push(doc.data())
            })
            setDetails({email:temp[0].email,name:`${temp[0].name}`,paymentVerified:"N",phone:`${temp[0].phone}`,regNo:`${temp[0].regNo}`})
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        FetchEvents()
        FetchUserDetails()
    },[])


    // for testing use only 

    // useEffect(()=>{
    //     console.log(Ev)
    // },[Ev])


    const HandleRegister= async (EventName)=>{
        setVis("visible")
        const q = query(eventsRef,where("notificationGroup", "==", `${EventName}`))
        const querySnapShot = await getDocs(q)
        const temp = []
        try{
            querySnapShot.forEach((doc)=>{
                temp.push(doc.data())
            })
            setEv(temp)
            let RegEmails = temp[0]["Registered Emails"]
            RegEmails = [...RegEmails,`${currentUser.email}`]
            let RegInfo = temp[0]["Registered Users"]
            RegInfo = [...RegInfo,UserDetails]
            
            // await updateDoc(doc(db,"users",currentUser.uid),{
            //     allRegisteredEvents:[...allRegisteredEvents,Ev]
            // })

            await updateDoc(doc(db,"events",Ev[0].notificationGroup),{
                "Registered Emails":RegEmails,
                "Registered Users":RegInfo,
            })
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="Home">
            {/* <PopUpWindow style={{visibility:`${vis}`}}/> */}
            {
                !currentUser &&
                <div className="PopUpWindow" onClick={()=>{setVis("hidden")}} style={{visibility:`${vis}`}}>
                    <input className="CancelBtn" type='button' onClick={()=>{setVis("hidden")}} value='X'></input>
                        <div className="PopUpForm">
                            <p>Login In or Register to Access all features.</p>
                            <Link to='login'>Login</Link>
                            <Link to='Register'>Register</Link>
                        </div>
                </div>
            }

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