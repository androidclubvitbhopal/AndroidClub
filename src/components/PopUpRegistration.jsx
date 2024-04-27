import { useEffect, useState } from "react"

function PopUpWindow(){
    const [vis,setVis] = useState('visible')
    // useEffect(()=>{
    //     console.log(vis)
    // },[vis])
    const HandleSubmit=(e)=>{
        e.preventDefault()
        console.log('Hii')
    }
    return(
        <div className="PopUpWindow" style={{visibility:`${vis}`}}>
            <input type='button' onClick={()=>{setVis("hidden")}}></input>
            <form onSubmit={(e)=>HandleSubmit(e)} className="PopUpForm">
                <input type='text' placeholder="Name"></input>
                <input type='email' placeholder="Email"></input>
                <input type='number' placeholder="Phone Number"></input>
                <input type='text' placeholder="Registration Number"></input>
                <input type='file' placeholder="Name"></input>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default PopUpWindow