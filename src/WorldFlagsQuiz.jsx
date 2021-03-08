import _ from 'lodash';
import React, {useMemo} from 'react';
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
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

  const questions = useMemo(
    () => (data ? makeQuestions(data.countries, 4) : []),
    [data]
  );

  return error ? error.message : (
    <Quiz
      description="Test your knowledge of world flags."
      questions={questions}
      title="World Flags Quiz"
    />
  );
}
