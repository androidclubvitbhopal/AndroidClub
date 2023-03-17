import { useState } from "react";
import "./EventStream.css"
function Stream(props){
    const [vis,setVis] = useState(`${props.vis}`)
    const Vis =()=>{
        setVis("hidden")
    }
    return(
        <div className="StreamPage">
            <iframe id="ytplayer" type="text/html" 
            src={`https://www.youtube.com/embed/qVUv8PCRHCc?autoplay=1&origin=http://example.com`}
            frameborder="0"></iframe>
            <iframe width="185" height="315" src="https://www.youtube.com/live_chat?v=qVUv8PCRHCc&embed_domain=localhost:3001/LiveStream" frameborder="0"></iframe>
            <button>Close</button>
        </div>
    )
}
export default Stream