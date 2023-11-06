import "./NavBar.css";
import { Link } from "react-scroll";

function NavBar() {
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
      </ul>
    </nav>
  );
}

export default NavBar;
