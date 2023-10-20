// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AlertState from "./context/notes/AlertState";
import alertContext from "./context/notes/alertContext";
import React, { useContext } from "react";

function App() {
 const context = useContext(alertContext)
  // console.log(context.allu)
  // console.log(context.alert.msg)
  // const allu = Context ? Context.allu : null;
  // const allu = Context.alert;
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={context.alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
