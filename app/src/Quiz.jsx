import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function QuizQuestion({
  choices,
  correctChoice,
  selectedChoice,
  stem,
  onClickAnswer,
  onClickNext
}) {
  const isAnswered = selectedChoice !== null;
  return (
    <div className="quiz">
      <div className="quiz-question">{stem}</div>
      <ListGroup className="quiz-answers">
        {choices.map(choice => {
          let variant = null;
          if (choice.value === selectedChoice) {
            variant = "danger";
          }
          if (isAnswered && choice.value === correctChoice) {
            variant = "success";
          }
          return (
            <ListGroup.Item
              action={!isAnswered}
              key={choice.key}
              variant={variant}
              value={choice.value}
              onClick={onClickAnswer}
            >{choice.value}</ListGroup.Item>
          );
        })}
      </ListGroup>
      <div className="quiz-continue">
        <Button disabled={!isAnswered} onClick={onClickNext} variant="primary">Next</Button>
      </div>
    </div>
  );
}

function Quiz({
  currentScore,
  maxScore,
  ...otherProps
}) {
  return (
    <div>
      <p>{currentScore} / {maxScore}</p>
      <QuizQuestion {...otherProps} />
    </div>
  );
}

export default function QuizLoader({
  description,
  errorMessage,
  isStarted,
  loading,
  title,
  onClickStartQuiz,
  ...otherProps
}) {
  if (!isStarted) {
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <Button onClick={onClickStartQuiz}>Start quiz</Button>
      </div>
    );
  }
  if (loading) {
    return 'Loading...';
  }
  if (errorMessage) {
    return errorMessage;
  }
  return (
    <Quiz {...otherProps}/>
  );
}
