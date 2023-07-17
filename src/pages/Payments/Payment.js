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
    const [UserDetails,setUDetails] = useState({})
    const [userEvents,setUserEvents]  =useState([])

    const [details,setDetails] = useState([])
    const [teamName,setTN] = useState("")
    const [err,setErr] = useState(false)

    const FetchUserDetails =async()=>{
        const q = query(usersRef,where('email','==',currentUser.email))
        const temp = []
        const querySnapShot = await getDocs(q)
        try{
            querySnapShot.forEach((doc)=>{
                temp.push(doc.data())
            })
            setUDetails({email:temp[0].email,name:`${temp[0].name}`,paymentVerified:"N",phone:`${temp[0].phone}`,regNo:`${temp[0].regNo}`,paymentImgURL:"",location:""})
            setUserEvents(temp[0].allRegisteredEvents)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        FetchUserDetails()
    },[])
    useEffect(()=>{
        console.log(Evpayment.noOfmembers)
    })

    const HandleDetailsSubmit =async(e) =>{
        e.preventDefault();
        let teamInfo = []

        for(let i=3;i<=12;i=i+2){
            if(i==3){
                const name = e.target[2].value
                const phoneNo = e.target[3].value
                const memR = e.target[4].value
                const memEmail = e.target[5].value
                const temp = {name:`${name}`,phoneNo:phoneNo,registrationNo:`${memR}`,email:`${memEmail}`}
                teamInfo = [...teamInfo,temp];
                i=5;

            }
            else{
                const memR = e.target[i-1].value
                const memEmail = e.target[i].value
                const temp = {registrationNo:`${memR}`,email:`${memEmail}`}
                teamInfo = [...teamInfo,temp];
            }
        }
        console.log(teamInfo);
        setDetails(teamInfo)
        setTN({teamName:e.target[0].value,Culture:e.target[1].value});

    }
    const  HandleSubmit=async(e)=>{
        let k = false;
        e.preventDefault()
        const q = query(eventsRef,where("notificationGroup", "==", `${Evpayment.notificationGroup}`))
        const querySnapShot = await getDocs(q)
        const temp = []
        const PaymentSS = e.target[0].files[0]
        const storageid = new Date().getTime()
        const storageRef = ref(storage,`EventPayments/${Evpayment.notificationGroup}/${currentUser.email}`)
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
            if(Evpayment.noOfmembers==1){
                RegEmails = [...RegEmails,`${currentUser.email}`]
                let RegInfo = temp[0]["Registered Users"]
                let UserEvents = userEvents
                UserEvents = [...UserEvents,`${temp[0].notificationGroup}`]
                await uploadBytesResumable(storageRef,PaymentSS)
                    .then(()=>{
                        getDownloadURL(storageRef).then(async (downloadURL) => {
                            try{
                                console.log('heyyy')
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
                                    navigate("/RegisteredEvents")
                                    alert(`Registered for ${Evpayment.name}`)
                                })
                            }
                            catch(err){
                                setErr(true)
                                console.log(err)
                            }
                    })
                })
            }
            else{
                for(let i=0;i<details.length;i++){
                    RegEmails = [...RegEmails,`${details[i].email}`]
                }
                // RegEmails = [...RegEmails,`${currentUser.email}`]

                let RegInfo = temp[0]["Registered Teams"]
                let UserEvents = []
                // UserEvents = [...UserEvents,`${temp[0].notificationGroup}`]
                await uploadBytesResumable(storageRef,PaymentSS)
                    .then(()=>{
                        getDownloadURL(storageRef).then(async (downloadURL) => {
                            try{
                                RegInfo = [...RegInfo,{teamName:teamName.teamName,teamCulture:teamName.Culture,teamDetails:details,paymentImgURL:`${downloadURL}`,paymentVerified:"N"}]
                                console.log({teamName:teamName.teamName,teamCulture:teamName.Culture,teamDetails:details,paymentImgURL:`${downloadURL}`,paymentVerified:"N"})
                                await updateDoc(doc(db,"events",Evpayment.notificationGroup),{  
                                    "Registered Emails":RegEmails,
                                    "Registered Teams":RegInfo,
                                }).then(async()=>{
                                    for(let i=0;i<4;i++){
                                        console.log('hi')
                                        const q = query(usersRef,where('email','==',details[i].email))
                                        const temp1 = []
                                        const querySnapShot = await getDocs(q)
                                        console.log(querySnapShot)
                                        console.log(temp1)
                                        try{
                                            querySnapShot.forEach((doc)=>{
                                                temp1.push({ id: doc.id, ...doc.data() })
                                            })
                            
                                            UserEvents = temp1[0].allRegisteredEvents
                                        }catch(err){
                                            console.log(err)
                                        }
                                        if(temp1.length>0){
                                            UserEvents = [...UserEvents,`${temp[0].notificationGroup}`]
                                            await updateDoc(doc(db,"users",temp1[0].id),{
                                                allRegisteredEvents:UserEvents
                                            })
                                        }
                                    }

                                    navigate("/RegisteredEvents")
                                    alert(`Registered for ${Evpayment.name}`)
                                })
                            }
                            catch(err){
                                setErr(true)
                                console.log(err)
                            }
                    })
                })
            }
        }
    }

    return(
        <div className="Home payment-page">
        <div className="payments" style={{backgroundImage:`url(${Evpayment.bannerURL})`,backdropFilter: 'blur(8px)', webkitBackdropFilter: 'blur(8px)'}}>
        {!details[0] && Evpayment.noOfMembers>1 && 
            <div className="FormBox">
                <p style={{textAlign:'center'}}>For more details <a href=''>view word file</a></p>
                <form onSubmit={(e)=>HandleDetailsSubmit(e)}>
                    <label style={{color:'#282c34'}}>Team Name</label>
                    <input type='text' placeholder="Team-Name"></input>
                    <label style={{color:'#282c34'}}>Mention the culture that you'll be working with. (Read Instructions before choosing!!.) </label>
                    <input type='text' placeholder='Culture -'></input>
                    <div className="detailsSet">
                        <label>Details of Team leader member</label>
                        <input type='text' placeholder="name" required></input>
                        <input type='number' placeholder="phone-number of Team leader" required></input>
                        <input type='text' placeholder="Registration Number of Team leader" required></input>
                        <input type='email' placeholder="College Email of Team leader" required></input>
                    </div>

                    <div className="detailsSet">
                        <label>Details of 2nd member</label>
                        <input type='text' placeholder="Registration Number of 2nd member" required></input>
                        <input type='email' placeholder="College Email of 2nd member" required></input>
                    </div>

                    <div className="detailsSet">
                        <label>Details of 3rd member</label>
                        <input type='text' placeholder="Registration Number of 3rd member"></input>
                        <input type='email' placeholder="College Email of 3rd member"></input>
                    </div>

                    <div className="detailsSet">
                        <label>Details of 4th member</label>
                        <input type='text' placeholder="Registration Number of 4th member"></input>
                        <input type='email' placeholder="College Email of 4th member"></input>
                    </div>
                    <input type='submit' value='Next' className="submit" style={{backgroundColor:'#282c34',borderRadius:'15px',color:'greenyellow'}}></input>

                </form>
            </div>

        }
        {(details[0] || Evpayment.noOfMembers==1) &&            
            <div className="FormBox" style={{top:'10%'}}>
                <form onSubmit={(e)=>HandleSubmit(e)}>
                    <img src='https://firebasestorage.googleapis.com/v0/b/android-club-65a70.appspot.com/o/randomqrcode.jpeg?alt=media&token=38a7db21-144a-4684-8a9b-a9dbf6881f4d' width='30%' style={{alignSelf:'center'}}></img>
                    <p>OR</p>
                    <p style={{textAlign:'center'}}>Clubs bank account details: <br></br>
                        Account Number: 6565521552 <br></br>
                        IFSC Code: IDIB000V143 <br></br>
                        Bank Name: Indian Bank, VIT Bhopal University,  Kothrikalan 
                    </p>
                    {
                        UserDetails.regNo[1] == 1 &&
                        <label>Event fees - ₹300</label>  
                    }  
                    {
                        UserDetails.regNo[1] == 2 &&
                        <label>Event fees - ₹100</label> 
                    }                
                    <label htmlFor="Fl"><img src={ProfilePicIcon} style={{height:'50px',alignSelf:'center'}}></img><p style={{marginLeft:'5%',marginTop:"3%"}}>Add Payment Screenshot</p></label>
                    <input id="Fl" type="file" placeholder="file" style={{display:'none'}} required></input>
                    <input type="submit" id="S" value="Register"></input>
                    {err && <span style={{alignSelf:'center'}}>Something went wrong, Try Again</span>}
                    <p style={{width:'26%',color:'black'}}>Have an Account? <b><Link style={{textDecoration:'none'}} to="/login">Login Now</Link></b></p>
                </form>
            </div>
        }
        </div>
    </div>
    )
}

export default Payment
