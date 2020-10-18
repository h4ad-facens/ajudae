import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Preload from '../screens/Preload';
import MainTab from '../stacks/MainTab';

const Stack = createStackNavigator();

export default () => (
  <>
    <Stack.Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  </>
);
