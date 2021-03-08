import Button from 'react-bootstrap/Button';

import QuizPage from './QuizPage.jsx';

function QuizCover({
  title,
  description,
  disabled,
  onClickStartQuiz,
}) {
  return (
    <div className="quiz">
      <h1>{title}</h1>
      <p>{description}</p>
      <Button
        disabled={disabled}
        onClick={onClickStartQuiz}
      >Start quiz</Button>
      <div id="github-ribbon">
        <a href="https://github.com/Ceasar/WorldFlagsQuiz"><img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149" className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"/></a>
      </div>
    </div>
  );
}

function QuizResults({
  score,
  totalQuestions,
  onClickStartQuiz,
}) {
  return (
    <div className="quiz">
      <h1>Quiz Complete!</h1>
      <p>Final Score: {score} / {totalQuestions}</p>
      <Button onClick={onClickStartQuiz}>Play again</Button>
    </div>
  );
}

export default function Quiz({
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
      <QuizCover
        title={title}
        description={description}
        disabled={totalQuestions === 0}
        onClickStartQuiz={onClickStartQuiz}
      />
    );
  }
  if (isComplete) {
    return (
      <QuizResults
        score={score}
        totalQuestions={totalQuestions}
        onClickStartQuiz={onClickStartQuiz}
      />
    );
  }
  return (
    <QuizPage score={score} totalQuestions={totalQuestions} {...otherProps}/>
  );
}
