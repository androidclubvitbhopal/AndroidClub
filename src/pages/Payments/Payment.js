import { Authcontext } from "../../contextProvider";
import { useContext, useEffect, useState } from "react";
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { getDocs,doc } from "firebase/firestore";
import { Link,useNavigate } from "react-router-dom";
import { storage } from "../../firebaseconfig";
import { getDownloadURL } from "firebase/storage";
import ProfilePicIcon from "../../images/user.png"
import { ref, uploadBytesResumable } from "firebase/storage";
import "./payments.css";

function Payment(){
    const navigate = useNavigate()
    const {currentUser} = useContext(Authcontext)
    const {Evpayment,setEvPay} = useContext(Authcontext)
    const eventsRef = collection(db, "events");
    const usersRef = collection(db, "users");
    const [UserDetails,setDetails] = useState({})
    const [userEvents,setUserEvents]  =useState([])
    const [err,setErr] = useState(false)

    const FetchUserDetails =async()=>{
        const q = query(usersRef,where('email','==',currentUser.email))
        const temp = []
        const querySnapShot = await getDocs(q)
        try{
            querySnapShot.forEach((doc)=>{
                temp.push(doc.data())
            })
            setDetails({email:temp[0].email,name:`${temp[0].name}`,paymentVerified:"N",phone:`${temp[0].phone}`,regNo:`${temp[0].regNo}`,paymentImgURL:"",location:""})
            setUserEvents(temp[0].allRegisteredEvents)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        FetchUserDetails()
    },[])
    const  HandleSubmit=async(e)=>{
        let k = false;
        e.preventDefault()
        const q = query(eventsRef,where("notificationGroup", "==", `${Evpayment.notificationGroup}`))
        const querySnapShot = await getDocs(q)
        const temp = []
        const PaymentSS = e.target[0].files[0]
        const storageid = new Date().getTime()
        const storageRef = ref(storage,`${storageid}`)
        querySnapShot.forEach((doc)=>{
            temp.push(doc.data())
        })
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
            RegEmails = [...RegEmails,`${currentUser.email}`]
            let RegInfo = temp[0]["Registered Users"]
            let UserEvents = userEvents
            UserEvents = [...UserEvents,{name:temp[0].name,description:temp[0].description,time:temp[0].time,bannerURL:temp[0].bannerURL,location:temp[0].location}]
            await uploadBytesResumable(storageRef,PaymentSS)
                .then(()=>{
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try{
                            let UD = UserDetails
                            UD.paymentImgURL = `${downloadURL}`
                            RegInfo = [...RegInfo,UD]
                            await updateDoc(doc(db,"events",Evpayment.notificationGroup),{  
                                "Registered Emails":RegEmails,
                                "Registered Users":RegInfo,
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
            alert(`Registered for ${Evpayment.name}`)
        }
    }

    return(
        <div className="Home payment-page">
        <div className="Login">
            <div className="FormBox" style={{top:'10%'}}>
                <form onSubmit={(e)=>HandleSubmit(e)}>
                        <img src='https://firebasestorage.googleapis.com/v0/b/android-club-65a70.appspot.com/o/randomqrcode.jpeg?alt=media&token=38a7db21-144a-4684-8a9b-a9dbf6881f4d' width='30%' style={{alignSelf:'center'}}></img>
                        <label htmlFor="Fl"><img src={ProfilePicIcon} style={{height:'50px',alignSelf:'center'}}></img><p style={{marginLeft:'5%',marginTop:"3%"}}>Add Payment Screenshot</p></label>
                        <input id="Fl" type="file" placeholder="file" style={{display:'none'}} required></input>
                        <input type="submit" id="S" value="Register"></input>
                        {err && <span style={{alignSelf:'center'}}>Something went wrong, Try Again</span>}
                        <p style={{width:'26%',color:'black'}}>Have an Account? <b><Link style={{textDecoration:'none'}} to="/login">Login Now</Link></b></p>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Payment