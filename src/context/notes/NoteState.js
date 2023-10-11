import { useState } from "react";
import NoteContext from "./noteContext";
// import React from 'react'

const NoteState = (props)=> {

   const noteInitial =[   {
      "_id": "651e75aa37f6def59bacbe747",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater note hello",
      "tag": "balla",
      "date": "2023-10-05T08:36:58.411Z",
      "__v": 0
    },
    {
      "_id": "651e75aa37f6de5a9bacbe749",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater note hello",
      "tag": "balla",
      "date": "2023-10-05T08:36:58.591Z",
      "__v": 0
    },
    {
      "_id": "651e75aa37f6ded59bacbe74b",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater note hello",
      "tag": "balla",
      "date": "2023-10-05T08:36:58.738Z",
      "__v": 0
    },
    {
      "_id": "651e75aa37f6der59bacbe74d",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater note hello",
      "tag": "balla",
      "date": "2023-10-05T08:36:58.984Z",
      "__v": 0
    },
    {
      "_id": "651e75ab37f6deg59bacbe74f",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater note hello",
      "tag": "balla",
      "date": "2023-10-05T08:36:59.168Z",
      "__v": 0
    },
    {
      "_id": "651e75ab37f6de5h9bacbe751",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater note hello",
      "tag": "balla",
      "date": "2023-10-05T08:36:59.348Z",
      "__v": 0
    },
    {
      "_id": "651e75ab37f6de5j9bacbe753",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater note hello",
      "tag": "balla",
      "date": "2023-10-05T08:36:59.527Z",
      "__v": 0
    },
    {
      "_id": "651e75ab37fa6de59bacbe755",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater note hello",
      "tag": "balla",
      "date": "2023-10-05T08:36:59.719Z",
      "__v": 0
    },
    {
      "_id": "651e75ab37f6dwe59bacbe757",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater note hello",
      "tag": "balla",
      "date": "2023-10-05T08:36:59.898Z",
      "__v": 0
    },
    {
      "_id": "6523ea6f381dfd6q7e5ded2519",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the Shapater sad note hello",
      "tag": "balla",
      "date": "2023-10-09T11:56:31.880Z",
      "__v": 0
    },
    {
      "_id": "6523ea783s81dfod67e5de251b",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "from the killer sad note hello",
      "tag": "balla",
      "date": "2023-10-09T11:56:40.351Z",
      "__v": 0
    },
    {
      "_id": "6523f7s997507f66c73ff0f1b",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "the killer sad note hello",
      "tag": "balla",
      "date": "2023-10-09T12:52:41.328Z",
      "__v": 0
    },
    {
      "_id": "6523f79e75057f66c73ff0f1d",
      "user": "651e6f17961f0e3df5a6dd6c",
      "title": "walla",
      "description": "the k sadiller sad note hello",
      "tag": "balla",
      "date": "2023-10-09T12:52:46.209Z",
      "__v": 0
    }
        
    ]



    const [notes, setNotes] = useState(noteInitial)

    
    // ADD Notes
    const addNote =(title, description, tag)=> {
      console.log(description);
      const note = [    {
        "_id": "6523f79e75057f66c73ff0f1d",
        "user": "651e6f17961f0e3df5a6dd6c",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-10-09T12:52:46.209Z",
        "__v": 0
      }]
      //yahn hum keh rahay hain k notes state jo k eik array hai us main add karo note aur concat jo function hai wo eik array return karta hai aur is naye array main jis main note (note matlab jo naya note user ny add karwaya hai wo is main hoga note naam k variable main) ussay hum change kar dein gy state setNotes ki madad say 
      setNotes(notes.concat(note))
    }

    // Delete  Notes
    const deleteNote =(id)=> {
      console.log("note has been deleted");
      setNotes(notes.filter((note=> {return note._id !== id})))
    }

    // Edit a Note
    const editNote =()=> {

      
    }



    return (  
    // ab noteContext file say hum ny eik Context bana liya aur ussay yahn import bhi kar diya  ab essay samjho k context humain kehta hai k ab ko jo value pass karni hai wo value main de do aur ussay wrap kardo NoteContext.Provider tag main
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
         {/* props.children ko ap component pass kar saktay ho aur is ka simple kaam ussay render karna hota hai aur yeh component ap parrent component say pass kartay ho for example hamaray case main wo App.js hai jis say child component pass hon gy aur pass karnay k liye ap ko bus un component koo jis ko ap is component yeni NoteState ko pass karna chahatay hain un ko <NoteState> <\NoteState> tags k under llikhna hoga*/}
        {props.children} 
    </NoteContext.Provider>

  )

}

export default NoteState