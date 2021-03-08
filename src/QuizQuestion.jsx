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
          if (choice.value === selectedChoice) {
            variant = "danger";
          }
          if (isAnswered && choice.value === answer) {
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
    </div>
  );
}
