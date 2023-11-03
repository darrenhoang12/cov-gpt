import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar/Navbar";
import Form from "./components/Form/Form";

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
      <Form></Form>
      <p className="message"></p>
    </div>
  );
}

export default App;
