import Button from 'react-bootstrap/Button';

import QuizQuestion from './QuizQuestion.jsx';

export default function QuizPage({
  questionNumber,
  selectedChoice,
  score,
  totalQuestions,
  onClickNext,
  ...otherProps
}) {
  const isAnswered = selectedChoice !== null;
  return (
    <div className="quiz">
      <div className="quiz-question-number">Question: {questionNumber + 1} / {totalQuestions}</div>
      <div>Score: {score}</div>
      <QuizQuestion selectedChoice={selectedChoice} {...otherProps} />
      <div className="quiz-continue">
        <Button disabled={!isAnswered} onClick={onClickNext} variant="primary">Next</Button>
      </div>
    </div>
  );
}
