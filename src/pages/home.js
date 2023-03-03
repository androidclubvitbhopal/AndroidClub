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

    const HandleSubmit=(e)=>{
        e.preventDefault()
        console.log('Hii')
    }
    return(
        <div className="Home">
            {/* <PopUpWindow style={{visibility:`${vis}`}}/> */}
            <div className="PopUpWindow" onClick={()=>{setVis("hidden")}} style={{visibility:`${vis}`}}>
                <input className="CancelBtn" type='button' onClick={()=>{setVis("hidden")}} value='X'></input>
                <form onSubmit={(e)=>HandleSubmit(e)} className="PopUpForm">
                    <input type='text' placeholder="Name"></input>
                    <input type='email' placeholder="Email"></input>
                    <input type='number' placeholder="Phone Number"></input>
                    <input type='text' placeholder="Registration Number"></input>
                    <input type='file' placeholder="Name"></input>
                    <input type='submit'></input>
                </form>
            </div>

            <Navbar/>
            <div className="Events">
                {
                    Event.map((Events)=>(
                        <div className="Event" onClick={()=>{setVis("visible")}} style={{backgroundImage:`url(${Events.bannerURL})`}}>
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