import React, { useContext } from "react";
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
  
  return (
    <>

      <AddNotes />
      <div className="row my-3">
        <h2>Notes</h2>
        {/* yahn map function main yeh hoga k notes ko load kiya jaye gah noteContext.js k notes say aur jesay hi eik note call hoga toh ussi k saath hum Noteitem function call kar dein gy aur us note ko us component ko pass kar dein gy */}
        {notes.map((note) => {
          // wesay hum sirf note={note} bhi pass kar saktay thay aur aglay main yeni Noteitem component main  key={note._id} set kar saktay thay
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Note;