import _ from 'lodash';
import React, {useCallback, useState} from 'react';
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

function QuizQuestion(props) {
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [buttonStates, setButtonStates] = useState({});
  const onClick = useCallback((event) => {
    const value = event.target.value;
    setChosenAnswer(value);
    setIsCorrectAnswer(props.correctValue === value);
    let nextButtonStates = {};
    nextButtonStates[value] = "danger";
    nextButtonStates[props.correctValue] = "success";
    setButtonStates(nextButtonStates);
  }, [props.correctValue]);
  const onClickNext = useCallback(() => {
    setChosenAnswer(null);
    setButtonStates({});
    props.onClickNext();
  }, []);
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
  const [countryChoices, setCountryChoices] = useState([]);
  const [answer, setAnswer] = useState(null);
  const choices = countryChoices.map(country => ({
    key: country.code,
    value: country.name,
  }));
  const onClickNext = useCallback(() => {
    const countryChoices = _.sampleSize(countries, numChoices);
    setCountryChoices(countryChoices);
    setAnswer(_.sample(countryChoices));
  }, []);
  const onClickStartQuiz = useCallback(() => {
    setIsQuizStarted(true);
    onClickNext();
  });
  return (isQuizStarted ? (
    <QuizQuestion
      question={answer.emoji}
      choices={choices}
      correctValue={answer.name}
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
