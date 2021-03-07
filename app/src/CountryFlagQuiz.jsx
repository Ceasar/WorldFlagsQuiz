import _ from 'lodash';
import React, {useCallback, useReducer} from 'react';
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

function questionReducer(state, action) {
  switch (action.type) {
    case 'startQuiz':
    case 'nextQuestion':
      return action.question;
    default:
      return state;
  }
}

function scoreReducer(state, action) {
  switch (action.type) {
    case 'startQuiz':
      return {currentScore: 0, maxScore: 0}
    case 'chooseAnswer':
      return {
        currentScore: state.currentScore + (action.isCorrect ? 1 : 0),
        maxScore: state.maxScore + 1,
      };
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
    question: questionReducer(state.question, action),
    score: scoreReducer(state.score, action),
    selectedChoice: selectedChoiceReducer(state.choice, action),
  };
}

export default function CountryFlagQuiz() {
  const [state, dispatch] = useReducer(quizReducer, {
    choice: null,
    isStarted: false,
    question: {},
    score: {current: 0, maxScore: 0},
  });
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

  const getNextQuestion = function(countries) {
    const countryChoices = _.sampleSize(countries, 4);
    const correctChoice = _.sample(countryChoices)
    const answer = correctChoice.name;
    const choices = countryChoices.map(country => ({
      key: country.code,
      value: country.name,
    }));
    const stem = correctChoice.emoji;
    return {answer, choices, stem}
  };

  const onClickAnswer = useCallback((event) => {
    const choice = event.target.value;
    dispatch({
      choice,
      correctChoice: state.question.answer,
      isCorrect: choice === state.question.answer,
      type: 'chooseAnswer',
    });
  }, [dispatch, state]);
  const onClickNext = useCallback(() => {
    dispatch({type: 'nextQuestion', question: getNextQuestion(data.countries)});
  }, [data, dispatch]);
  const onClickStartQuiz = useCallback(() => {
    dispatch({type: 'startQuiz', question: getNextQuestion(data.countries)});
  }, [data, dispatch]);

  return (
    <Quiz
      choices={state.question.choices}
      correctChoice={state.question.answer}
      currentScore={state.score.currentScore}
      description="Test your knowledge of the flags of the world."
      error={error}
      isStarted={state.isStarted}
      loading={loading}
      maxScore={state.score.maxScore}
      selectedChoice={state.selectedChoice}
      stem={state.question.stem}
      title="World Flag Quiz"
      onClickAnswer={onClickAnswer}
      onClickNext={onClickNext}
      onClickStartQuiz={onClickStartQuiz}
    />
  )
}
