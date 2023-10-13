import React,{useContext} from 'react'
import { useState } from 'react'
import noteContext from '../context/notes/noteContext'
const AddNotes = () => {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const onChange = (e) => {

        // yahn hum ny spread operator use kiya hai jo note array ki copy banaye gah matlab spread operator copy bana deta aur yeh copy is liye bhi zarrori hai kyu k hum state yeni note ko direct change nahi kar saktay toh is liye hum us ki copy bana rahay hain aur is walay spread operator ka eik yeh bhi kaam hota hai k yeh array k last main value dalta hai toh spread operator say hum keh rahay hain k array k last main value dalo bus itna
        // phir agay e.target.name say hum us input feild ko target kar rahay hain jis ka name 
        //[e.target.name]: The square brackets around e.target.name indicate that the property name in the object being created is not a fixed string but is computed at runtime based on the value of e.target.name.
        //e.target.name main yeh toh title aye gah yeh description toh agar user wahan type kar raha hai jahan name = title hai toh yahn name ajaye gah aur agar user wahn type kar raha hai jahan name = description hai toh yahn description ajaye gah
        //e.target.value is main current input feild value hogi
        // toh agar user jahan name =  title  hai wahan per click karta hai aur us main kuch likhta hai toh title naam ka object ban jaye gah aur agar user description per clcik karta hai user aur us main kuch likhta hai toh description naam ka object ban jaye gah aur [] jo lagaye hain us say hum javascript ko bata rahay hain k yeh object constant nahi hai balkay yeh object ki key aur value runtime per decide hogi
        // toh issay ap esssay samjhay setNote({last, title or descrription: value put in title or description})
        setNote({...note, [e.target.name]: e.target.value})
    }
    const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
    }


  return (
    <div className="container my-3">
        <h2>Add Notes</h2>
        <form className="my-3">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name='title' placeholder="Enter Title" onChange={onChange}/>
          </div>
          <div className="form-group my-2">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" name='description' placeholder="Enter Description" onChange={onChange}/>
          </div>
          <div className="form-group my-2">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' placeholder="Enter Tag" onChange={onChange}/>
          </div>
          
          <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Submit</button>
        </form>
      </div>
  )
}

export default AddNotes