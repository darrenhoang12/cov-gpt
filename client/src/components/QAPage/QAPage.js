import "./QAPage.css";
import QAItem from "../QAItem/QAItem";

function QAPage() {
  const qaData = [
    {
      question: "What does CovGPT do?",
      answer: "Description for what CovGPT does",
    },
    {
      question: "How was CovGPT built?",
      answer:"Description on how CovGPT was built",
    },
  ];

  return (
    <div className="qa-container">
      <div className="qa">
        <h1>Frequently Asked Questions</h1>
      </div>
      <hr />
      {qaData.map((qa, index) => (
        <QAItem
          key={index}
          question={qa.question}
          answer={qa.answer}
          isLastItem={index === qaData.length - 1}
        />
      ))}
    </div>
  );
}

export default QAPage;
