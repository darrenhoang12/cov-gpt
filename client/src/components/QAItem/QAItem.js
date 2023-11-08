import React, { useState } from "react";

const QAItem = ({ question, answer, isLastItem }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="qa">
      <div
        className="question"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {question}
      </div>
      {showAnswer && <div className="answer">{answer}</div>}
      {!isLastItem && <hr />}
    </div>
  );
};

export default QAItem;