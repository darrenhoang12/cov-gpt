import "./Tech.css";

function Tech() {
  return (
    <div className="about-tech">
      <h2 className="centered-h2">Built with technologies of the future!</h2>
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
            className="node"
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
            className="rapidapi"
            src="https://upload.wikimedia.org/wikipedia/commons/6/62/RapidAPI_logo.svg"
            alt="rapidapi"
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
  );
}

export default Tech;
