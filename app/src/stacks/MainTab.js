import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext, useEffect } from 'react';

import CustomTabBar from '../components/CustomTabBar';
import { UserContext } from '../contexts/UserContext';
import Causes from '../screens/Causes';
import Ongs from '../screens/Ongs';
import Profile from '../screens/Profile';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Tab = createBottomTabNavigator();

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);

  useEffect(() => {
    AsyncStorage.getItem('ajudae@user').then((user) => {
      userDispatch({
        type: 'setUser',
        payload: {
          ...JSON.parse(user),
        },
      });
    });
  }, [userDispatch]);

  return (
    <Tab.Navigator
      screenOptions={{}}
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Ongs" component={Ongs} />
      <Tab.Screen name="Causes" component={Causes} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="SignUp" component={SignUp} />
    </Tab.Navigator>
  );
};
