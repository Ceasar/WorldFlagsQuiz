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
    }
  }
`;

function makeQuestions(countries, numChoices) {
  return _.shuffle(countries).map(country => {
    const answer = country.name;
    const distractors = _.sampleSize(countries, numChoices).map(
      country => country.name
    ).filter(
      countryName => countryName !== answer
    ).slice(0, numChoices - 1);
    const choices = _.shuffle(distractors.concat(country.name));
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
