import { collection } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import { Authcontext } from "../../contextProvider"
import { db } from "../../firebaseconfig"
import { where,query } from "firebase/firestore"
import { getDocs } from "firebase/firestore"
import Stream from "../Event-Stream/EventStream"
import { Footer } from "../../components/Footer/Footer";
import "./registeredEvents.css"

function RegisteredEvents(){
    const {currentUser} = useContext(Authcontext)
    const [userDetails,setDetails] = useState([])
    const [eventDetails,setEvDt] = useState({})
    const [vis,setVis] = useState("hidden")
    const [Evid,setId] = useState("")
    const userRef = collection(db,"users")
    const eventRef  = collection(db,"events")
    // const eventRef = collection (db,"events")
    const UserEvents = async()=>{
        const q= query(userRef,where('email','==',currentUser.email))
        const temp = []
        const querySnapShot = await getDocs(q)
        try{
            querySnapShot.forEach((doc)=>{
                temp.push(doc.data())
            })
            setDetails(temp[0].allRegisteredEvents)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        console.log(eventDetails.YouTubeVidId)
    },[eventDetails])
    const HandleBack=()=>{
        setVis("hidden")
        setEvDt({})
    }
    const HandleClick = async (Event) =>{
        setVis("visible")
        console.log(Event)
        const q= query(eventRef,where('notificationGroup','==',Event.notificationGroup))
        const temp = []
        const querySnapShot = await getDocs(q)
        try{
            querySnapShot.forEach((doc)=>{
                temp.push(doc.data())
            })
            console.log(temp[0])
            setEvDt(temp[0])
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        UserEvents()
    },[])
    return(
        <div className="reg1">
            <Navbar/>
            <div className="reg-events">
                {
                    userDetails.map((Event,i)=>(
                        <div className="reg-event" style={{backgroundImage:`url(${Event.bannerURL})`}}>
                            <div className="reg-event-moreInfo">
                                <div className="reg-event-name">{Event.name}</div>
                                <p className="reg-event-mode" >Mode :{Event.location}</p>
                                <p className="reg-event-description">Details : {Event.description}</p>
                                <p className="reg-event-time">Time :{Event.time}</p>
                            </div>
                            <button className="live-now-btn" onClick={()=>{HandleClick(Event)}} style={{padding:'2%'}}>View Event Status</button>
                        </div>
                    ))
                }
                {/* <Stream YtID='qVUv8PCRHCc' vis={`${vis}`}/> */}
            </div>
            <Footer/>
            <div className="PopUpWindow" onClick={()=>HandleBack()} style={{visibility:`${vis}`}}>
                <div className="LivePopUp">
                    <div className="stream-page">
                        <iframe id="ytplayer" type="text/html" 
                        src={`https://www.youtube.com/embed/${eventDetails.YouTubeVidId}?autoplay=1&origin=http://example.com`}
                        frameborder="0" allowfullscreen="allowfullscreen"></iframe>
                        {/* <iframe allowfullscreen="" frameborder="0" height="270" src="https://www.youtube.com/live_chat?v=hHW1oY26kxQ&embed_domain=localhost" width="480"></iframe> */}
                        <iframe className="comments" width="185" height="315" src={`https://www.youtube.com/live_chat?v=${eventDetails.YouTubeVidId}&embed_domain=localhost" frameborder="0`}></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisteredEvents