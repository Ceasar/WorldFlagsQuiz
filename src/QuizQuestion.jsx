import ListGroup from 'react-bootstrap/ListGroup';

export default function QuizQuestion({
  answer,
  choices,
  selectedChoice,
  stem,
  onClickAnswer,
}) {
  const isAnswered = selectedChoice !== null;
  return (
    <div className="quiz-question">
      <div className="quiz-question-stem">{stem}</div>
      <ListGroup className="quiz-answers">
        {choices.map(choice => {
          let variant = null;
          if (choice === selectedChoice) {
            variant = "danger";
          }
          if (isAnswered && choice === answer) {
            variant = "success";
          }
          return (
            <ListGroup.Item
              action={!isAnswered}
              key={choice}
              variant={variant}
              value={choice}
              onClick={onClickAnswer}
            >{choice}</ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
