import "./QAPage.css";
import QAItem from "../QAItem/QAItem";

function QAPage() {
  const qaData = [
    {
      question: "What inspired CovGPT?",
      answer: `As a university student in Computer Science, there's always a struggle balancing a variety of aspects in life, including job-hunting. 
         With job hunting comes the tedious process of drafting cover letters for openings that require them. Because cover letters are a summary
         of how your professional career tie into the company you are applying for, feeding this information into a generative AI like
         ChatGPT could create a great cover letter.`,
    },
    {
      question: "What does CovGPT do?",
      answer:
        "CovGPT takes in minimal information: just your LinkedIn profile and the company of choice, and generates a unique cover letter for you in seconds!",
    },
    {
      question: "How was CovGPT built?",
      answer: `CovGPT was built with React for the client side and NodeJS (Express) for the server side. I implemented the ChatGPT API to provide the
       generated cover letter given the inputted information.`,
    },
    {
      question: "Who was this made by?",
      answer: `This was built by me, Darren Hoang. Find out more about me on my <a href='https://darrenhoang.com/' target='_blank'>website</a>
         or <a href='https://www.linkedin.com/in/darrenhoang/' target='_blank'>LinkedIn!</a>`,
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
