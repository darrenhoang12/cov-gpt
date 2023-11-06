import "./About.css";
import { Element } from "react-scroll";

function About() {
  return (
    <Element name="about">
      <h2 className="centered-h1">Built with technologies of the future!</h2>
      <div className="about">
        <div className="tech-stack">
          <div className="tech">
            <img
              className="react"
              src="https://hostingassets.com/faq/4356.png"
              alt="React"
            />
          </div>
          <div className="tech">
            <img
              class="node"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png"
              alt="NodeJS"
            />
          </div>
          <div className="tech">
            <img
              className="chatgpt"
              src="https://freelogopng.com/images/all_img/1681038628chatgpt-icon-logo.png"
              alt="ChatGPT"
            />
          </div>
          <div className="tech">
            <img
              className="cheerio"
              src="https://cheerio.js.org/img/orange-c.svg"
              alt="cheerio"
            />
          </div>
          <div className="tech">
            <img
              className="github"
              src="https://i0.wp.com/www.globalemancipation.ngo/wp-content/uploads/2017/09/github-logo.png?ssl=1"
              alt="GitHub"
            />
          </div>
        </div>
      </div>
    </Element>
  );
}

export default About;
