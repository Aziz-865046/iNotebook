import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import React, { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/signin"
              element={<SignIn showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<SignUp showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
