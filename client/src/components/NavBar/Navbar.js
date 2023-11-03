import "./NavBar.css";
import { Link } from "react-scroll";

function NavBar() {
  return (
    <nav>
      <h1 className="logo">CovGPT</h1>
      <ul className="menu">
        <li>
          <Link
            activeClass="active"
            to="landing"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "5px 10px",
              borderRadius: "5px",
              background: "lightgray",
              color: "black",
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
              border: "1px solid #ccc",
              padding: "5px 10px",
              borderRadius: "5px",
              background: "lightgray",
              color: "black",
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
              border: "1px solid #ccc",
              padding: "5px 10px",
              borderRadius: "5px",
              background: "lightgray",
              color: "black",
            }}
          >
            ABOUT
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
