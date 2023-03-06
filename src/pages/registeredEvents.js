import { collection } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { Authcontext } from "../contextProvider"
import { db } from "../firebaseconfig"
import { where,query } from "firebase/firestore"
import { getDocs } from "firebase/firestore"

function RegisteredEvents(){
    const {currentUser} = useContext(Authcontext)
    const [userDetails,setDetails] = useState([])

    const userRef = collection(db,"users")
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
        console.log(userDetails)
    },[userDetails]) 
    useEffect(()=>{
        UserEvents()
    },[])

    return(
        <>
            <Navbar/>
            <div className="RgEvents" style={{position:'absolute',backgroundColor:'black',top:'50%'}}>
                {
                    userDetails.map((Event)=>(
                        <p>{Event}</p>
                    ))
                }
            </div>

        </>
    )
}
export default RegisteredEvents