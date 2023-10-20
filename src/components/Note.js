import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useEffect } from "react";
import alertContext from "../context/notes/alertContext";

const Note = () => {
  const context = useContext(noteContext);
  const aContext = useContext(alertContext);
  // This line is using object destructuring to extract properties from the context object. It's equivalent to: 
  //const notes = context.notes;
  //const getNotes = context.getNotes;
  //const editNote = context.editNote;
  // With object destructuring, you can extract specific properties from an object and create variables with the same names.
  //useContext hook, it will always return an object.
  const {notes, getNotes, editNote} = context;
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({eid: "",etitle: "", edescription: "", etag: ""})


  const updateNote =(currentNote)=>{
    ref.current.click()
    setNote({eid: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    aContext.showAlert("Text Converted To Upper Case", "success");
    // console.log(aContext.allu)
  }


const onChange = (e) => {

setNote({...note, [e.target.name]: e.target.value})
}
const handleClick = (e) => {
  editNote(note.eid, note.etitle, note.edescription, note.etag);
  refClose.current.click();
  setNote({eid: "",etitle: "", edescription: "", etag: ""})

  e.preventDefault();
}

  return (
    <>


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add notses</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                  <form className="my-3">
                    <div className="form-group">
                      <label htmlFor="etitle">Title</label>
                      <input type="text" className="form-control" id="etitle" name='etitle' placeholder="Enter Title" value={note.etitle} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="edescription">Description</label>
                      <input type="text" className="form-control" id="edescription" name='edescription' placeholder="Enter Description" value={note.edescription} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="etag">Tag</label>
                      <input type="text" className="form-control" id="etag" name='etag' placeholder="Enter Tag" value={note.etag} onChange={onChange}/>
                    </div>
                    
                  </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled = {note.etitle.length< 5 || note.edescription.length < 5}  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <AddNotes />
      <div className="row my-3">
        <h2>Notes</h2>
        <div className="container">
          {/* // agar ap k pass else condition na ho toh ap ko  && use kar saktay ho is ka simple matlab yehi hota hai k agar pheli condition true hai toh equal to k baad jo cheez hai ussay print karwa do warna ap ko yaad hoga phelay ap likhtay thay k yeh hojaye nahi toh wo hojaye ? essa kuch use kar  k  */}
        {notes.length === 0 && "No notes To display"}
        </div>
        {/* yahn map function main yeh hoga k notes ko load kiya jaye gah noteContext.js k notes say aur jesay hi eik note call hoga toh ussi k saath hum Noteitem function call kar dein gy aur us note ko us component ko pass kar dein gy */}
        {notes.map((note) => {
          // wesay hum sirf note={note} bhi pass kar saktay thay aur aglay main yeni Noteitem component main  key={note._id} set kar saktay thay
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Note;