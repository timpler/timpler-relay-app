import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const API_URL = 'http://localhost:5000/graphql';

const relayNetwork = Network.create(async (operation, variables) => {
  const fetchResponse = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${null}`,
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  const fetchResult = await fetchResponse.json();

  return fetchResult;
});

const recordsSource = new RecordSource();
const store = new Store(recordsSource);

store.subscribe;

console.log({ recordsSource });

export const environment = new Environment({
  network: relayNetwork,
  store,
});
