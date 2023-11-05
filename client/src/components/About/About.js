import "./About.css";
import { Element } from "react-scroll";

function About() {
  return (
    <Element name="about">
      <h2 className="centered-h1">Built with technologies of the future!</h2>
      <div className="about">
        <div className="tech-stack">
          <div className="tech">React</div>
          <div className="tech">Node</div>
          <div className="tech">ChatGPT</div>
          <div className="tech">Cheerio</div>
          <div className="tech">GitHub</div>
        </div>
      </div>
    </Element>
  );
}

export default About;
