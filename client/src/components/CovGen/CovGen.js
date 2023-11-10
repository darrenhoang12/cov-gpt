import "./CovGen.css";
import { Element } from "react-scroll";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";

function CovGen() {
  const serverURL = 'http://localhost:3001';
  const [linkedin, setLinkedin] = useState("");
  const [company, setCompany] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [typewriterKey, setTypewriterKey] = useState(0);
  const coverLetter = `I'm Darren and I’m At UCI majoring in computer science! 
    I’m a hardworking student with strong leadership skills who has a passion for software and creating valuable insights through data. 
    I’m looking for opportunities in data analysis, data science, and software engineering to sharpen my technical skills and learn industry practices.`;

  const generateLetter = async (e) => {
    e.preventDefault();

    if (!linkedin || !company) {
      alert("Please fill in both LinkedIn and Company fields.");
      return;
    }

    try {
      console.log('trying fetch');
      const response = await fetch(`${serverURL}/${encodeURIComponent(linkedin)}/${company}`);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setShowOutput(true);
    setTypewriterKey((prevKey) => prevKey + 1);
  };

  const resetForm = () => {
    setShowOutput(false);
    setLinkedin("");
    setCompany("");
    setTypewriterKey((prevKey) => prevKey + 1);
  };

  return (
    <Element name="covgen" className="covgen">
      <div className="form-container">
        <form>
          <div className="form-element">
            <label className="linkedin-label">LinkedIn Profile URL</label>
            <div className="input-element">
              <span className="input-icon-span">
                <svg
                  className="input-icon"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                </svg>
              </span>
              <input
                type="text"
                className="linkedin"
                placeholder="https://linkedin.com/in/John-Doe"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="form-element">
            <label className="company-label">Company</label>
            <div className="input-element">
              <span className="input-icon-span">
                <svg
                  className="input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                className="company"
                placeholder="Experian"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              ></input>
            </div>
          </div>
          <button className="generate-button" onClick={generateLetter}>
            Generate
          </button>
        </form>
      </div>
      <div key={typewriterKey} className={`output ${showOutput ? "show" : ""}`}>
        <Typewriter
          key={typewriterKey}
          onInit={(typewriter) => {
            typewriter.pauseFor(500).typeString(coverLetter).start();
          }}
          options={{
            speed: 50,
            delay: 15,
          }}
        />
      </div>
      {showOutput && (
        <button className="generate-button restart" onClick={resetForm}>
          Restart
        </button>
      )}
    </Element>
  );
}

export default CovGen;
