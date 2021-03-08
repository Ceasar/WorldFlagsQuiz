import React, {useCallback, useMemo, useReducer} from 'react';
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

export function Quiz({
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

function questionNumberReducer(state, action) {
  switch (action.type) {
    case 'startQuiz':
      return 0;
    case 'nextQuestion':
      return state + 1;
    default:
      return state;
  }
}

function scoreReducer(state, action) {
  switch (action.type) {
    case 'startQuiz':
      return 0;
    case 'chooseAnswer':
      return state + (action.isCorrect ? 1 : 0);
    default:
      return state;
  }
}

function selectedChoiceReducer(state, action) {
  switch (action.type) {
    case 'startQuiz':
    case 'nextQuestion':
      return null;
    case 'chooseAnswer':
      return action.choice
    default:
      return state
  }
}

function isStartedReducer(state, action) {
  switch (action.type) {
    case 'startQuiz':
      return true;
    default:
      return state;
  }
}

function quizReducer(state, action) {
  return {
    isStarted: isStartedReducer(state.isStarted, action),
    questionNumber: questionNumberReducer(state.questionNumber, action),
    score: scoreReducer(state.score, action),
    selectedChoice: selectedChoiceReducer(state.choice, action),
  };
}

const QUIZ_INITIAL_STATE = {
  isStarted: false,
  questionNumber: 0,
  score: 0,
  selectedChoice: null,
};

export default function QuizApp({
  description,
  questions,
  title,
}) {
  const [state, dispatch] = useReducer(quizReducer, QUIZ_INITIAL_STATE);

  const question = useMemo((
    () => (questions[state.questionNumber] || {})
  ), [questions, state.questionNumber]);

  const onClickAnswer = useCallback((event) => {
    const choice = event.target.value;
    dispatch({
      choice,
      isCorrect: choice === question.answer,
      type: 'chooseAnswer',
    });
  }, [dispatch, question]);
  const onClickNext = useCallback(() => {
    dispatch({type: 'nextQuestion'});
  }, [dispatch]);
  const onClickStartQuiz = useCallback(() => {
    dispatch({type: 'startQuiz'});
  }, [dispatch]);

  return (
    <Quiz
      answer={question.answer}
      choices={question.choices}
      description={description}
      isComplete={state.questionNumber >= questions.length}
      isStarted={state.isStarted}
      questionNumber={state.questionNumber}
      selectedChoice={state.selectedChoice}
      score={state.score}
      stem={question.stem}
      title={title}
      totalQuestions={questions.length}
      onClickAnswer={onClickAnswer}
      onClickNext={onClickNext}
      onClickStartQuiz={onClickStartQuiz}
    />
  );
}
