import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function QuizQuestion({
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

function Quiz({
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

export default function QuizLoader({
  description,
  isComplete,
  isStarted,
  score,
  title,
  totalQuestions,
  onClickStartQuiz,
  ...otherProps
}) {
  if (!isStarted) {
    return (
      <div className="quiz">
        <h1>{title}</h1>
        <p>{description}</p>
        <Button
          disabled={totalQuestions === 0}
          onClick={onClickStartQuiz}
        >Start quiz</Button>
        <div id="github-ribbon">
          <a href="https://github.com/Ceasar/WorldFlagsQuiz"><img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149" className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"/></a>
        </div>
      </div>
    );
  }
  if (isComplete) {
    return (
      <div className="quiz">
        <h1>Quiz Complete!</h1>
        <p>Final Score: {score} / {totalQuestions}</p>
        <Button onClick={onClickStartQuiz}>Play again</Button>
      </div>
    );
  }
  return (
    <Quiz score={score} totalQuestions={totalQuestions} {...otherProps}/>
  );
}
