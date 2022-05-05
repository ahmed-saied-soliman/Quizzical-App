import React from 'react';
import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';

import '../styles/quiz.css';
const Question = React.lazy(() => import('../components/Question'));

export default function Quiz() {
  const { state } = useLocation();
  const { questions } = state || {};

  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [checkCorrectness, setCheckCorrectness] = React.useState();

  const [open, setOpen] = React.useState(false);
  const closeModal = () => setOpen(false);

  const [result, setResult] = React.useState(false);

  function onClick(event) {
    handleSubmit(event);
  }

  function handleCallback(answers, id) {
    if (id in Object.keys(selectedAnswers)) {
      setSelectedAnswers((oldAnswers) => {
        oldAnswers[id] = answers;
        return oldAnswers;
      });
    } else {
      setSelectedAnswers((oldAnswers) => {
        return { [id]: answers, ...oldAnswers };
      });
    }
  }

  function checkCorrectAnswers(selectedAnswers, questions) {
    let correct = 0;
    for (let i = 0; i < Object.keys(selectedAnswers).length; i++) {
      if (selectedAnswers[i] === questions[i].correct_answer) {
        correct = correct + 1;
      }
    }
    return correct;
  }

  function handleSubmit(e) {
    if (Object.keys(selectedAnswers).length < 5) {
      setOpen((o) => !o);
    } else {
      setResult((o) => !o);
      setCheckCorrectness(checkCorrectAnswers(selectedAnswers, questions));
    }
    e.preventDefault();
  }

  const questionsElements = questions.map((question, index) => (
    <Question
      key={question.id}
      question={question.question}
      index={index}
      incorrect_answers={question.incorrect_answers}
      correct_answer={question.correct_answer}
      setSelectedAnswers={handleCallback}
      result={result}
    />
  ));

  return (
    <main>
      <svg
        className="before"
        width="194"
        height="147"
        viewBox="0 0 194 147"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.4095 81.3947C71.1213 50.8508 33.3179 21.7816 37.1727 -19.6933C41.4394 -65.599 75.854 -105.359 118.419 -123.133C158.797 -139.994 206.035 -130.256 241.822 -105.149C271.947 -84.0141 272.823 -43.8756 282.141 -8.27104C292.17 30.0508 318.521 70.8106 296.501 103.779C273.538 138.159 224.991 143.432 183.931 138.768C148.318 134.723 123.751 107.677 99.4095 81.3947Z"
          fill="#FFFAD1"
        />
      </svg>
      <Suspense fallback={<h1>Loading..........</h1>}>
        <form className="questions" onSubmit={onClick}>
          {questionsElements}
          <div className="check">
            <p className={`${result ? 'show' : 'hidden'}`}>
              You scored {checkCorrectness}/5 correct answers
            </p>
            <button type="submit" className="submit">
              Check answers
            </button>
          </div>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="modal">
              <h2>Alert</h2>
              <a className="close" onClick={closeModal}>
                &times;
              </a>
              <div className="break"></div>
              <p>Please Answer All The Questions to Submit</p>
            </div>
          </Popup>
        </form>
      </Suspense>
      <svg
        className="after"
        width="148"
        height="118"
        viewBox="0 0 148 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z"
          fill="#DEEBF8"
        />
      </svg>
    </main>
  );
}
