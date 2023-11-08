import "./About.css";
import { Element } from "react-scroll";
import Tech from "../Tech/Tech";
import QAPage from "../QAPage/QAPage";

function About() {
  return (
    <Element className="about" name="about">
      <Tech></Tech>
      <QAPage></QAPage>
    </Element>
  );
}

export default About;
