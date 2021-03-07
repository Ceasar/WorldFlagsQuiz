import _ from 'lodash';
import React, {useCallback, useReducer, useState} from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

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

function reducer(state, action) {
  switch (action.type) {
    case 'startQuiz':
    case 'nextQuestion':
      const countryChoices = _.sampleSize(action.countries, action.numChoices);
      const correctChoice = _.sample(countryChoices)
      const question = correctChoice.emoji;
      const choices = countryChoices.map(country => ({
        key: country.code,
        value: country.name,
      }));
      const answer = correctChoice.name;
      return {
        answer,
        choices,
        question,
      }
    default:
      throw new Error();
  }
}

function QuizQuestion(props) {
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [buttonStates, setButtonStates] = useState({});
  const onClick = useCallback((event) => {
    const value = event.target.value;
    setChosenAnswer(value);
    let nextButtonStates = {};
    nextButtonStates[value] = "danger";
    nextButtonStates[props.answer] = "success";
    setButtonStates(nextButtonStates);
  }, [props.answer]);
  const onClickNext = useCallback(() => {
    setChosenAnswer(null);
    setButtonStates({});
    props.onClickNext();
  }, [props.onClickNext]);
  const isChoiceMade = chosenAnswer !== null;
  return (
    <div className="quiz">
      <div className="quiz-question">{props.question}</div>
      <ListGroup className="quiz-answers">
        {props.choices.map(choice => {
          const variant = buttonStates[choice.value];
          console.log(variant);
          return (
            <ListGroup.Item
              action={!isChoiceMade}
              key={choice.key}
              variant={variant}
              value={choice.value}
              onClick={onClick}
            >{choice.value}</ListGroup.Item>
          );
        })}
      </ListGroup>
      {isChoiceMade && (
        <div className="quiz-continue">
          <Button onClick={onClickNext} variant="primary">Next</Button>
        </div>
      )}
    </div>
  );
}

function QuizApp({countries, numChoices}) {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizQuestion, dispatch] = useReducer(reducer, {});
  const onClickNext = useCallback(() => {
    dispatch({type: 'nextQuestion', countries, numChoices});
  }, [countries, numChoices]);
  const onClickStartQuiz = useCallback(() => {
    setIsQuizStarted(true);
    dispatch({type: 'startQuiz', countries, numChoices});
  }, [countries, numChoices, onClickNext]);
  return (isQuizStarted ? (
    <QuizQuestion
      question={quizQuestion.question}
      choices={quizQuestion.choices}
      answer={quizQuestion.answer}
      onClickNext={onClickNext}
    />
  ) : (
    <div>
      <h1>World Flag Quiz</h1>
      <p>Test your knowledge of the flags of the world.</p>
      <Button onClick={onClickStartQuiz}>Start quiz</Button>
    </div>
  ));
}

export default function CountryFlagQuiz() {
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});
  return (loading || error) ? (
    <p>{error ? error.message : 'Loading...'}</p>
  ) : (
    <QuizApp countries={data.countries} numChoices={4} />
  );
}
