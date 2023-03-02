import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { getDocs } from "firebase/firestore";
import PopUpWindow from "../components/PopUpRegistration";

function Home(){
    const [Event,setEvent] = useState([])
    const [vis,setVis] = useState("hidden")

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
    return(
        <div className="Home">
            <PopUpWindow style={{visibility:`${vis}`}}/>
            <Navbar/>
            <p>Home</p>
            <div className="Events">
                {
                    Event.map((Events)=>(
                        <div className="Event" style={{backgroundImage:`url(${Events.bannerURL})`}}>
                        {/* style={{visibility:`${vis}`}} onMouseEnter={()=>{setVis("visible")}} onMouseLeave={()=>{setVis("hidden")}} */}
                            <div className="moreInfo" >
                                <div className="EventName">{Events.name}</div>
                                <p className="mode" style={{fontSize:'150%'}}><b>Location:  </b>{Events.location}</p>
                                <p className="description">{Events.description}</p>
                                <p className="time"><b>Time:  </b>{Events.time}</p>
                                <p className="Price"><b>Price:  </b>{Events.price}</p>
                            </div>
                            <button className="RegisterBtn" onClick={()=>{setVis("visible")}}>Register</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Home