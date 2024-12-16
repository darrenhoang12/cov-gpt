import "./NavBar.css";
import { Link } from "react-scroll";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useRef } from "react";

function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showLetters, setShowLetters] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLetters = () => setShowLetters(false);
  const handleShowLetters = () => setShowLetters(true);
  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [savedLetters, setSavedLetters] = useState([]);
  const [loginError, setLoginError] = useState(false);

  const login = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (username !== "" && password !== "") {
      const rawResponse = await fetch("http://localhost:3001/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const content = await rawResponse.json();
      console.log(content.error);
      if (!content.error) {
        setLoggedIn(true);
        handleCloseLogin();
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    } else {
      setLoginError(true);
      console.log("Login: Username/password is empty");
    }
  };

  const register = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    console.log(username);
    if (username !== "" && password !== "") {
      const rawResponse = await fetch("http://localhost:3001/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "darren", password: password }),
      });
      const content = await rawResponse.json();
      console.log(content);
      if (!content.error) {
        setRegistered(true);
      }
    } else {
      console.log("Register: Username/password is empty");
    }
  };

  const getSaved = async () => {
    const rawResponse = await fetch("http://localhost:3001/savedLetters", {
      method: "GET",
      credentials: "include",
    });
    const content = await rawResponse.json();
    setSavedLetters(content);
    handleShowLetters();
  };

  return (
    <nav>
      <Link
        className="link logo"
        activeClass="active"
        to="landing"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
        style={{
          cursor: "pointer",
        }}
      >
        CovGPT
      </Link>
      <ul className="menu">
        <li>
          <Link
            className="link"
            activeClass="active"
            to="landing"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            style={{
              cursor: "pointer",
            }}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="covgen"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            style={{
              cursor: "pointer",
            }}
          >
            GENERATE
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            style={{
              cursor: "pointer",
            }}
          >
            ABOUT
          </Link>
        </li>
        <li>
          {loggedIn === false ? (
            <Button
              className="login"
              variant="primary"
              onClick={handleShowLogin}
            >
              LOGIN
            </Button>
          ) : (
            <Button
              className="savedLetters"
              variant="primary"
              onClick={getSaved}
            >
              Saved
            </Button>
          )}
        </li>
      </ul>
      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
        dialogClassName="saved-modal"
        id="register-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="login">
            <label>Username</label>
            <input id="loginUsername" type="text" ref={usernameRef}></input>
            <label>Password</label>
            <input id="loginPassword" type="password" ref={passwordRef}></input>
          </form>
          {registered && (
            <Modal.Body className="registerMessage">
              Successfully Registered
            </Modal.Body>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="footer">
            {loginError && (
              <div className="invalid-login">
                Incorrect username or password
              </div>
            )}
            <div className="login-buttons">
              <Button variant="secondary" onClick={register}>
                Register
              </Button>
              <Button variant="primary" onClick={login}>
                Login
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showLetters}
        onHide={handleCloseLetters}
        dialogClassName="saved-modal"
        id="saved-letters-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Saved Letters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {savedLetters.map((letter, index) => (
            <div key={index} className="modal-letter">
              {letter.letterContent}
              <hr></hr>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </nav>
  );
}

export default NavBar;
