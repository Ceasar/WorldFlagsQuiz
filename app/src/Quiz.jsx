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
      {isAnswered && (
        <div className="quiz-continue">
          <Button onClick={onClickNext} variant="primary">Next</Button>
        </div>
      )}
    </div>
  );
}

export default function Quiz({
  choices,
  correctChoice,
  currentScore,
  description,
  isStarted,
  maxScore,
  selectedChoice,
  stem,
  title,
  onClickAnswer,
  onClickNext,
  onClickStartQuiz,
}) {
  return (isStarted ? (
    <div>
      <p>{currentScore} / {maxScore}</p>
      <QuizQuestion
        choices={choices}
        correctChoice={correctChoice}
        selectedChoice={selectedChoice}
        stem={stem}
        onClickAnswer={onClickAnswer}
        onClickNext={onClickNext}
      />
    </div>
  ) : (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <Button onClick={onClickStartQuiz}>Start quiz</Button>
    </div>
  ));
}
