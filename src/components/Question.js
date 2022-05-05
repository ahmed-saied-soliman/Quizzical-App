import React from 'react';

export default function Question(props) {
  const [randomizedArr, setRandomizedArr] = React.useState([]);
  const [selectedAnswer, setSelectedAnswer] = React.useState([]);

  React.useEffect(() => {
    const answers = [...props.incorrect_answers, props.correct_answer];
    const randomizedArr = createRandom(answers);
    setRandomizedArr(randomizedArr);
  }, [props.incorrect_answers, props.correct_answer]);

  function handleChange(event) {
    setSelectedAnswer(event.target.value);
    props.setSelectedAnswers(event.target.value, props.index);
    event.preventDefault();
  }
  // Randomize answer of the Question
  function createRandom(arr) {
    let myArr = [...arr];
    let randomizedArr = [];

    while (myArr.length > 0) {
      let randomIndex = Math.floor(Math.random() * myArr.length);
      randomizedArr.push(myArr[randomIndex]);
      myArr.splice(randomIndex, 1);
    }
    return randomizedArr;
  }

  // RadioButton for the answers
  const RadioButton = ({ value, onChange, correct }) => {
    return (
      <input
        type="radio"
        label={value}
        name={props.questionID}
        value={value}
        checked={selectedAnswer === value}
        onChange={onChange}
        disabled={props.result}
        className={correct}
      />
    );
  };

  const answersElements = randomizedArr.map((answer, index) => {
    const correct =
      props.result & (answer === props.correct_answer) ? 'correct' : '';
    return (
      <RadioButton
        key={index}
        value={answer}
        onChange={handleChange}
        correct={correct}
      />
    );
  });

  return (
    <div className="question-row">
      <div className="single-question">{props.question}</div>
      <div className="answers">{answersElements}</div>
      <hr />
    </div>
  );
}
