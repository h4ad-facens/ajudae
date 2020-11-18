import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import UserContextProvider from './src/contexts/UserContext';
import MainStack from './src/stacks/MainStack';

const queryCache = new QueryCache();

if (__DEV__) {
  LogBox.ignoreLogs(['Setting a timer']);

  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin(queryCache);
  });
}

export default () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <UserContextProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </UserContextProvider>
    </ReactQueryCacheProvider>
  );
};
