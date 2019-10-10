import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import { environment } from './services/gql';
import { HelloScreen } from './screens';
import { RelayEnvironmentProvider } from 'relay-hooks';

console.log({ environment });

export const App = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <SafeAreaView>
        <View>
          <Text>Step One</Text>
        </View>
        <HelloScreen />
      </SafeAreaView>
    </RelayEnvironmentProvider>
  );
};
