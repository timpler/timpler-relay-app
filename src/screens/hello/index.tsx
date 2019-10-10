import React from 'react';
import { graphql } from 'react-relay';
import { helloQuery } from './__generated__/helloQuery.graphql';
import { createQueryHook } from '~app/services/gql/relay/hooks';
import { getSafely } from '~app/services/utils';
import { View, Text } from 'react-native';

const useHello = createQueryHook<helloQuery>(
  graphql`
    query helloQuery {
      allChildTables {
        edges {
          node {
            nodeId
          }
        }
      }
    }
  `,
  {
    dataFrom: 'STORE_THEN_NETWORK',
    initialData: { allChildTables: { edges: [] } },
  },
);

export function Ebe() {
  const [{ allChildTables }] = useHello({});

  console.log(allChildTables);

  return null;
}

export function HelloScreen() {
  const [data] = useHello({});

  const results = getSafely(
    () => data.allChildTables!.edges!.map((edge) => edge.node!),
    [],
  );

  console.log(results);

  return (
    <View>
      {results.map((result) => {
        return <Text key={result.nodeId}>okok {result.nodeId}</Text>;
      })}
    </View>
  );
}
