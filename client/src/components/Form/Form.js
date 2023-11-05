import "./Form.css";

function Form() {
  return (
    <div className="form-container">
      <form>
        <div className="form-element">
          <label className="linkedin-label">LinkedIn Profile URL</label>
          <div className="input-element">
            <span className="input-icon-span">
              <svg
                className="input-icon"
                class="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
              </svg>
            </span>
            <input
              type="text"
              className="linkedin"
              placeholder="https://linkedin.com/in/John-Doe"
            ></input>
          </div>
        </div>
        <div className="form-element">
          <label className="company-label">Company</label>
          <div className="input-element">
            <span className="input-icon-span">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 font-semibold text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              className="company"
              placeholder="Experian"
            ></input>
          </div>
        </div>
        <button className="generate-button">Generate</button>
      </form>
    </div>
  );
}

export default Form;
