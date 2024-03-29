import { useState } from "react";
import NoteContext from "./noteContext";
// import React from 'react'

const NoteState = (props)=> {
  const host = "http://127.0.0.1:5000";
   const noteInitial =[]


    const [notes, setNotes] = useState(noteInitial)

      // Get all Notes
    const getNotes =async ()=> {

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZTZmMTc5NjFmMGUzZGY1YTZkZDZjIn0sImlhdCI6MTY5Njg1NTkyMH0.lDq-tevibz6Eg1gQrFIpkZpUWNeyNkb2DlNLGSTyz0E",
        },
      });
      const json = await response.json(); 
      setNotes(json);
      
    }




    
    // ADD Notes
    const addNote =async (title, description, tag)=> {

      //API
            //API
      //fetch(url, options): The fetch function is a modern JavaScript API for making network requests (HTTP requests). It takes at least one argument, the URL of the resource you want to fetch. In your code, you're sending a POST request to the url specified.
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        //headers: { "Content-Type": "application/json" }: HTTP headers provide additional information about the request or response, and they are sent as key-value pairs. In this case, you're specifying that the request body contains JSON data.
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZTZmMTc5NjFmMGUzZGY1YTZkZDZjIn0sImlhdCI6MTY5Njg1NTkyMH0.lDq-tevibz6Eg1gQrFIpkZpUWNeyNkb2DlNLGSTyz0E",
        },
        //body: JSON.stringify(data): The body property contains the data you want to send to the server. Before sending the data, it is converted to a JSON string using JSON.stringify(). This is necessary because the fetch API expects the body data to be a string.
        body: JSON.stringify({title, description, tag}), 
      });
      // response.json(): The response from the server is returned by the fetch function. In this code, the response is assumed to be in JSON format. response.json() is an asynchronous method that reads the response body to completion and returns a promise that resolves with the result of parsing the body text as JSON.
      const note = await response.json(); 
      //  Adding Note Code For client side
      // const note = [    {
      //   "_id": "6523f79e75057f66c73ff0f1d",
      //   "user": "651e6f17961f0e3df5a6dd6c",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   // "date": "2023-10-09T12:52:46.209Z",
      //   "__v": 0
      // }]

      // yahn hum keh rahay hain k notes state jo k eik array hai us main add karo note aur concat jo function hai wo eik array return karta hai aur is naye array main jis main note (note matlab jo naya note user ny add karwaya hai wo is main hoga note naam k variable main) ussay hum change kar dein gy state setNotes ki madad say 
      setNotes(notes.concat(note))
    }

    // Delete  Notes
    const deleteNote =async(id)=> {

      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZTZmMTc5NjFmMGUzZGY1YTZkZDZjIn0sImlhdCI6MTY5Njg1NTkyMH0.lDq-tevibz6Eg1gQrFIpkZpUWNeyNkb2DlNLGSTyz0E",
        },
      });
      const json = await response.json();
      console.log(json)
      setNotes(notes.filter((note=> {return note._id !== id})))
    }
    
    // Edit a Note
    const editNote = async(id, title, description, tag)=> {
      //API
      //fetch(url, options): The fetch function is a modern JavaScript API for making network requests (HTTP requests). It takes at least one argument, the URL of the resource you want to fetch. In your code, you're sending a POST request to the url specified.
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        //headers: { "Content-Type": "application/json" }: HTTP headers provide additional information about the request or response, and they are sent as key-value pairs. In this case, you're specifying that the request body contains JSON data.
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZTZmMTc5NjFmMGUzZGY1YTZkZDZjIn0sImlhdCI6MTY5NzE4MTU2OH0.LIM_uRHy6tfx2Do16Z5__xuVcMJTqyAJjVTJe8KrowQ",
        },
        //body: JSON.stringify(data): The body property contains the data you want to send to the server. Before sending the data, it is converted to a JSON string using JSON.stringify(). This is necessary because the fetch API expects the body data to be a string.
        body: JSON.stringify({id, title, description, tag}),
        // body: abc, 
      });
      // response.json(): The response from the server is returned by the fetch function. In this code, the response is assumed to be in JSON format. response.json() is an asynchronous method that reads the response body to completion and returns a promise that resolves with the result of parsing the body text as JSON.
      const json = await response.json(); 
      console.log(json)
      //Logic to edit in client side

      // yahn hum apnay notes (jo k state hai) uski eik copy bana rahay hain aur wo is liye kyu k hum state ko direct update nahi kar saktay toh is liye hum phelay state ki copy banaye gain phir hum us copy ko update karain gy phir ussi copy o setNotes ko pass kar dein gy takay hamari actual state notes bhi Update ho jaye 
      let newNotes = JSON.parse(JSON.stringify(notes))
      // acha hum yahn eik aur kaam bhi kar saktay thay k hum notes ki jagah neechay ki do line main bhi newNotes daal saktay thay matlab phir for loop phir newNotes ki lenght tak chalta aur kyu k newNotes exact coopy hai notes ki toh yeh method bhi theek hota yeni hum essa kar saktay thay for (let index = 0; index < newNotes.length; index++) { const element = newNotes[index];
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
        
      }
      setNotes(newNotes);

      
    }




    



    return (  
    // ab noteContext file say hum ny eik Context bana liya aur ussay yahn import bhi kar diya  ab essay samjho k context humain kehta hai k ab ko jo value pass karni hai wo value main de do aur ussay wrap kardo NoteContext.Provider tag main
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
         {/* props.children ko ap component pass kar saktay ho aur is ka simple kaam ussay render karna hota hai aur yeh component ap parrent component say pass kartay ho for example hamaray case main wo App.js hai jis say child component pass hon gy aur pass karnay k liye ap ko bus un component koo jis ko ap is component yeni NoteState ko pass karna chahatay hain un ko <NoteState> <\NoteState> tags k under llikhna hoga*/}
        {props.children} 
    </NoteContext.Provider>

  )

}

export default NoteState