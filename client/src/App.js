//import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar/Navbar";
import Landing from "./components/Landing/Landing";
import CovGen from "./components/CovGen/CovGen";
import About from "./components/About/About";

function App() {
  /*
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  });
  */

  return (
    <div className="App">
      <NavBar></NavBar>
      <Landing></Landing>
      <CovGen></CovGen>
      <About></About>
      <p className="message"></p>
    </div>
  );
}

export default App;
