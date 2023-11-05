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
              padding: "5px 10px",
              borderRadius: "5px",
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
              padding: "5px 10px",
              borderRadius: "5px",
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
              padding: "5px 10px",
              borderRadius: "5px",
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
