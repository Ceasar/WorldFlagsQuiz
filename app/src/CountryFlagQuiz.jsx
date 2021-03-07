import _ from 'lodash';
import React, {useState} from 'react';
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

export default function CountryFlagQuiz() {
    const [country, setCountry] = useState('US');
    const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});
    if (loading || error) {
        return <p>{error ? error.message : 'Loading...'}</p>;
    }

    const randomCountry = _.sample(data.countries);

    return (
        <div>
            <h1>Flag Quiz</h1>
            <h2>{randomCountry.name} {randomCountry.emoji}</h2>
        </div>
    );
}
