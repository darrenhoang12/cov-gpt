import React, { useState } from "react";
import { ReactComponent as PlusIcon } from "./plus.svg";
import { ReactComponent as MinusIcon } from "./minus.svg";

const QAItem = ({ question, answer, isLastItem }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="qa">
      <div className="question" onClick={() => setShowAnswer(!showAnswer)}>
        {question}
        {showAnswer ? <MinusIcon /> : <PlusIcon />}
      </div>
      {showAnswer && (
        <div
          className="answer"
          dangerouslySetInnerHTML={{ __html: answer }}
        ></div>
      )}
      {!isLastItem && <hr />}
    </div>
  );
};

export default QAItem;
