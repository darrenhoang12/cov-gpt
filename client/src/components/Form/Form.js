import "./Form.css";

function Form() {
  return (
    <form>
      <button className="linkedin">Login to LinkedIn</button>
      <label className="company-label">Company Name:</label>
      <input type="text" className="company"></input>
    </form>
  );
}

export default Form;
