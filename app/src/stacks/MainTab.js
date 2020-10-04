import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Ongs from '../screens/Ongs';
import Causes from '../screens/Causes';
import Profile from '../screens/Profile';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Tab = createBottomTabNavigator();

export default () => (
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
