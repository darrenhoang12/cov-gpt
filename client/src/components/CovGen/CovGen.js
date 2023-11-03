import "./CovGen.css";
import Form from "../Form/Form";
import Output from "../Output/Output";
import { Element } from "react-scroll";

function CovGen() {
  return (
    <Element name="covgen" className="covgen">
      <Form></Form>
      <Output></Output>
    </Element>
  );
}

export default CovGen;
