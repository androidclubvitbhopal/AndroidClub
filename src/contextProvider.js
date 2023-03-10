import { createContext, useEffect, useState } from "react";
import { auth } from "./firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Authcontext = createContext()
export const AuthcontextProvider =({children})=>{
    const [currentUser,setCurrentUser] = useState({})
    const [Evpayment,setEvPay] = useState([])

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            console.log(user);
        })
        return ()=>{
            unsub();
        }
    },[]);
    // <AuthContext.Provider value={{currentUser}}>
    //     {children}
    // </AuthContext.Provider>
    return(
        <Authcontext.Provider value={{currentUser,Evpayment,setEvPay}}>
            {children}
        </Authcontext.Provider>
    )
    
}