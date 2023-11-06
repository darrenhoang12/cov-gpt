import "./About.css";
import { Element } from "react-scroll";
import Tech from "../Tech/Tech";
import Faq from "../Faq/Faq";

function About() {
  return (
    <Element className="about" name="about">
      <Tech></Tech>
      <Faq></Faq>
    </Element>
  );
}

export default About;
