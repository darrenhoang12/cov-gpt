import "./Form.css";

function Form() {
  return (
    <form>
      <label className="linkedin-label">LinkedIn Profile URL</label>
      <div className="form-element">
        <input
          type="text"
          className="linkedin"
          placeholder="https://linkedin.com/in/John-Doe"
        ></input>
      </div>
      <label className="company-label">Company Name:</label>
      <div className="form-element">
        <input type="text" className="company" placeholder="Experian"></input>
      </div>
      <button className="generate-button">Generate</button>
    </form>
  );
}

export default Form;
