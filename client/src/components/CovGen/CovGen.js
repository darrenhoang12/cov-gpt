import "./CovGen.css";
import { Element } from "react-scroll";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import { ReactComponent as LoadingIcon } from "./loading.svg";

function CovGen() {
  const serverURL = "http://localhost:3001";
  const [linkedin, setLinkedin] = useState("");
  const [company, setCompany] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [typewriterKey, setTypewriterKey] = useState(0);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const generateLetter = async (e) => {
    e.preventDefault();

    try {
      if (!linkedin || !company) {
        throw new Error("Please fill in both LinkedIn and Company fields");
      }
      setLoading(true);
      fetch(
        `${serverURL}/${encodeURIComponent(linkedin.trim())}/${company.trim()}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((errorData) => {
              throw new Error(errorData.error || "Something went wrong");
            });
          }
        })
        .then((data) => {
          setCoverLetter(data.result.replace(/\n/g, "<br>"));
          setShowOutput(true);
          setTypewriterKey((prevKey) => prevKey + 1);
        })
        .catch((err) => {
          setError(true);
          alert(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      setError(true);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCoverLetter("");
    setShowOutput(false);
    setLinkedin("");
    setCompany("");
    setTypewriterKey((prevKey) => prevKey + 1);
  };

  const saveLetter = async () => {
    const rawResponse = await fetch(`${serverURL}/saveLetter`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ letter: coverLetter }),
    });
    const content = await rawResponse.json();
    console.log(content);
  };

  return (
    <Element name="covgen" className="covgen">
      <div className="form-container">
        <form>
          <div className="form-element">
            <label className="linkedin-label">LinkedIn Profile URL</label>
            <div className="input-element">
              <input
                type="text"
                className="linkedin"
                placeholder="https://linkedin.com/in/John-Doe"
                maxLength="100"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              ></input>
            </div>
            <label className="char-limit">Max 100 characters</label>
          </div>
          <div className="form-element">
            <label className="company-label">Company</label>
            <div className="input-element">
              <input
                type="text"
                className="company"
                placeholder="Experian"
                maxLength="25"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              ></input>
            </div>
            <label className="char-limit">Max 25 characters</label>
          </div>
          <button
            className="generate-button"
            onClick={generateLetter}
            disabled={loading}
          >
            {loading ? (
              <LoadingIcon className="loading-icon" /> // Use the loaded SVG as a React component
            ) : (
              "Generate"
            )}
          </button>
        </form>
      </div>
      <div key={typewriterKey} className={`output ${showOutput ? "show" : ""}`}>
        <Typewriter
          key={typewriterKey}
          onInit={(typewriter) => {
            typewriter.pauseFor(250).typeString(coverLetter).start();
          }}
          options={{
            delay: 0,
          }}
        />
      </div>
      {showOutput && (
        <button className="generate-button restart" onClick={resetForm}>
          Restart
        </button>
      )}{" "}
      {showOutput && !error && (
        <button className="generate-button restart" onClick={saveLetter}>
          Save Letter
        </button>
      )}
    </Element>
  );
}

export default CovGen;
