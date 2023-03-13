import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { getDocs,doc } from "firebase/firestore";
import { Link, Navigate ,useNavigate } from "react-router-dom";
import { Authcontext } from "../contextProvider";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebaseconfig";
import { getDownloadURL } from "firebase/storage";
import ProfilePicIcon from "../images/user.png"

function Home(){
    // const {Evpayment,setEvPay} = useContext(Authcontext) 
    const navigate = useNavigate()
    const [Event,setEvent] = useState([])
    const [Ev,setEv] = useState({})
    const [vis,setVis] = useState("hidden")
    const [payTabVis,setPVis] = useState("hidden")
    const {currentUser} = useContext(Authcontext)
    const [UserDetails,setDetails] = useState({})
    const [userEvents,setUserEvents]  =useState([])
    const [err,setErr] = useState(false)
    // const {Evpayment,setEvPay} = useContext(Authcontext)
    let i=false;
    let j=false;
    let k=0;
    // const [RgSt,setSt] = useState(false)

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
            setDetails({email:temp[0].email,name:`${temp[0].name}`,paymentVerified:"N",phone:`${temp[0].phone}`,regNo:`${temp[0].regNo}`,paymentImgURL:""})
            setUserEvents(temp[0].allRegisteredEvents)
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


    useEffect(()=>{
        k=k+1;
    },[UserDetails])
    
    const HandleInit=(Event)=>{
        setPVis("visible")
        setEv(Event)
    }
    const  HandlePaidRegister=async(e)=>{
        e.preventDefault()
        setVis("visible")
        const q = query(eventsRef,where("notificationGroup", "==", `${Ev.notificationGroup}`))
        const querySnapShot = await getDocs(q)
        const temp = []
        const PaymentSS = e.target[0].files[0]
        const storageid = new Date().getTime()
        const storageRef = ref(storage,`${storageid}`)
        querySnapShot.forEach((doc)=>{
            temp.push(doc.data())
        })
        let RegEmails = temp[0]["Registered Emails"]
        RegEmails = [...RegEmails,`${currentUser.email}`]
        let RegInfo = temp[0]["Registered Users"]
        let UserEvents = userEvents
        UserEvents = [...UserEvents,{name:temp[0].name,description:temp[0].description,time:temp[0].time,bannerURL:temp[0].bannerURL}]
        await uploadBytesResumable(storageRef,PaymentSS)
            .then(()=>{
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try{
                        let UD = UserDetails
                        UD.paymentImgURL = `${downloadURL}`
                        RegInfo = [...RegInfo,UD]
                        await updateDoc(doc(db,"events",Ev.notificationGroup),{  
                            "Registered Emails":RegEmails,
                            "Registered Users":UD,
                        }).then(async()=>{
                            await updateDoc(doc(db,"users",currentUser.uid),{
                                allRegisteredEvents:UserEvents
                            })
                        })
                    }
                    catch(err){
                        setErr(true)
                    }
            })
        })
        navigate("/RegisteredEvents")
        alert(`Registered for ${Ev.name}`)
    }
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
                if(k!=0){
                    let RegInfo = temp[0]["Registered Users"]
                    RegInfo = [...RegInfo,UserDetails]
                    console.log(UserDetails)
                    let UserEvents = userEvents
                    UserEvents = [...UserEvents,{name:temp[0].name,description:temp[0].description,time:temp[0].time,bannerURL:temp[0].bannerURL}]
                    await updateDoc(doc(db,"events",EventName),{
                        "Registered Emails":RegEmails,
                        "Registered Users":RegInfo,
                    }).then(async()=>{
                        await updateDoc(doc(db,"users",currentUser.uid),{
                            allRegisteredEvents:UserEvents
                        })
                    })
                    k=0;
            }
        }catch(err){
            console.log(err)
        }
        navigate("/RegisteredEvents")
        alert(`Registered for ${EventName}`)
    }
    return(
        <div className="Home">
            {
                !currentUser &&
                <div className="PopUpWindow" onClick={()=>{setVis("hidden")}} style={{visibility:`${vis}`}}>
                        <div className="PopUpForm">
                            <p>Hey Learner!! <br></br>Login In or Register to Access all features.</p>
                            <Link id='New' to='login'>Login</Link>
                            <Link id='New' to='Register'>Register</Link>
                            <input className="CancelBtn" type='button' onClick={()=>{setVis("hidden")}} value='Close'></input>
                        </div>
                </div>
            }
            <div className="PopUpWindow" onClick={()=>{setPVis("hidden")}} style={{visibility:`${payTabVis}`}}>
                <div className="PopUpForm">
                    <form onSubmit={(e)=>HandlePaidRegister(e)} style={{height:'100%'}}>
                        <label htmlFor="Fl"><img src={ProfilePicIcon} style={{height:'80px',alignSelf:'center'}}></img><p style={{marginLeft:'5%'}}>Submit screenshot of Payment</p></label>
                        <input id="Fl" type="file" placeholder="file" style={{display:'none'}} required></input>
                        <input type="submit" id="S" value="Register" style={{padding:'2%',height:'20%',width:'25%'}}></input>
                        {err && <span style={{alignSelf:'center'}}>Something has gone wrong, Try Again</span>}
                    </form>
                </div>
            </div>

            <Navbar/>
            <p className='Heading1'>All Upcoming Events</p>
            <div className="Events">
                {
                    Event.map((Events)=>{
                        if(Events.completion == false){
                            i=true;
                            return(
                                <div className="Event" style={{backgroundImage:`url(${Events.bannerURL})`}} onClick={()=>{setVis("visible")}}>
                                    <div className="moreInfo">
                                        <div className="EventName">{Events.name}</div>
                                        <p className="mode"><b>Location:  </b>{Events.location}</p>
                                        <p className="description">{Events.description}</p>
                                        <p className="time"><b>Time:  </b>{Events.time}</p>
                                        <p className="Price"><b>Price:  ₹</b>{Events.price}</p>
                                    </div>
                                    {
                                        currentUser && Events.price==0 &&
                                        <button className="RegisterBtn" onClick={()=>{HandleRegister(Events.notificationGroup)}}><span type='text'>Register</span></button>
                                    }
                                    {
                                        currentUser && Events.price!=0 &&
                                        <button className="RegisterBtn" onClick={()=>{HandleInit(Events)}}><span type='text'>Register</span></button>

                                    }
                                </div>
                            )
                        }
                        else if(!i && !j){
                            j=true;
                            return(
                                <div className="Event" onClick={()=>{setVis("visible")}} style={{background:'green'}}>
                                    <div className="NoInfo">
                                        <p className="EventName">No Events Scheduled as of Now <br></br>Come back later!!</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <p className='Heading2'>Completed Events</p>
            <h3> Whether you're a seasoned pro or just looking to try something new, you're sure to find a community of like-minded individuals ready to welcome you with open arms. Check out our completed events section to see what our club has been up to, and join in on the fun!</h3>
            <div className="Events" style={{marginTop:'15%'}}>
                {
                    Event.map((Events)=>{
                        if(Events.completion == true){
                            return(
                                <div className="Event" onClick={()=>{setVis("visible")}} style=         {{backgroundImage:`url(${Events.bannerURL})`}}>
                                    <div className="moreInfo">
                                        <div className="EventName">{Events.name}</div>
                                        <p className="description">{Events.description}</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
export default Home