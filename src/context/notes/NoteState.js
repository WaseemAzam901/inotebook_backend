import { useState } from "react";
import NoteContext from "./noteContext";
// import React from 'react'

const NoteState = (props)=> {

    const s1 = {
        "name": "Harry",
        "class": "5b"
    }

    const[state, setState] = useState(s1)
    // yeh function 1 sec baad setState ko use kar k state change karde gah
    const update = ()=> {
        setTimeout(() => {
            setState({
                "name": "Larry",
                "class": "10b"
            })
        }, 1000);
    }
    return (  
    // ab noteContext file say hum ny eik Context bana liya aur ussay yahn import bhi kar diya  ab essay samjho k context humain kehta hai k ab ko jo value pass karni hai wo value main de do aur ussay wrap kardo NoteContext.Provider tag main
    <NoteContext.Provider value={{state, update}}>
         {/* props.children ko ap component pass kar saktay ho aur is ka simple kaam ussay render karna hota hai aur yeh component ap parrent component say pass kartay ho for example hamaray case main wo App.js hai jis say child component pass hon gy aur pass karnay k liye ap ko bus un component koo jis ko ap is component yeni NoteState ko pass karna chahatay hain un ko <NoteState> <\NoteState> tags k under llikhna hoga*/}
        {props.children} 
    </NoteContext.Provider>

  )

}

export default NoteState