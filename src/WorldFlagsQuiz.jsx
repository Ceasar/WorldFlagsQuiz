import _ from 'lodash';
import React, {useCallback, useMemo, useReducer} from 'react';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

import Quiz from './Quiz.jsx';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      emoji
      code
    }
  }
`;

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

function questionsReducer(state, action) {
  switch (action.type) {
    case 'startQuiz':
      return action.questions;
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
    questions: questionsReducer(state.questions, action),
    score: scoreReducer(state.score, action),
    selectedChoice: selectedChoiceReducer(state.choice, action),
  };
}

function makeQuestions(countries, numChoices) {
  return _.shuffle(countries).map(country => {
    const answer = country.name;
    const distractors = _.sampleSize(countries, numChoices).filter(
      country => country.name !== answer
    ).slice(0, numChoices - 1);
    const choices = _.shuffle(distractors.concat(country).map(country => ({
      key: country.code,
      value: country.name,
    })));
    const stem = country.emoji;
    return {answer, choices, stem}
  });
}

export default function WorldFlagsQuiz() {
  const [state, dispatch] = useReducer(quizReducer, {
    choice: null,
    isStarted: false,
    question: 0,
    questions: [],
    score: 0,
  });
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

  const question = useMemo((
    () => (state.questions[state.questionNumber] || {})
  ), [state.questions, state.questionNumber]);

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
    const questions = data ? makeQuestions(data.countries, 4) : [];
    dispatch({type: 'startQuiz', questions});
  }, [data, dispatch]);

  return error ? error.message : (
    <Quiz
      answer={question.answer}
      choices={question.choices}
      description="Test your knowledge of world flags."
      isComplete={state.questionNumber >= state.questions.length}
      isStarted={state.isStarted}
      questionNumber={state.questionNumber}
      selectedChoice={state.selectedChoice}
      score={state.score}
      stem={question.stem}
      title="World Flags Quiz"
      totalQuestions={state.questions.length}
      onClickAnswer={onClickAnswer}
      onClickNext={onClickNext}
      onClickStartQuiz={onClickStartQuiz}
    />
  );
}
