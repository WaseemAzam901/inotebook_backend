import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useEffect } from "react";

const Note = () => {
  const context = useContext(noteContext);
  const {notes, getNotes} = context;
  useEffect(() => {
    getNotes()
  }, [])
  const updateNote =(note)=>{
    ref.current.click()
    setNote({etitle: note.title, edescription: note.edescription, etag: note.etag})
    // setNote(noter)
  }
const ref = useRef(null)


const [note, setNote] = useState({etitle: "", edescription: "", etag: "default"})

const onChange = (e) => {

setNote({...note, [e.target.name]: e.target.value})
}
const handleClick = (e) => {
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
                      <input type="text" className="form-control" id="etitle" name='etitle' placeholder="Enter Title" value={note.etitle} onChange={onChange}/>
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="edescription">Description</label>
                      <input type="text" className="form-control" id="edescription" name='edescription' placeholder="Enter Description" value={note.edescription} onChange={onChange}/>
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="etag">Tag</label>
                      <input type="text" className="form-control" id="etag" name='etag' placeholder="Enter Tag" value={note.etag} onChange={onChange}/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Submit</button>
                  </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <AddNotes />
      <div className="row my-3">
        <h2>Notes</h2>
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