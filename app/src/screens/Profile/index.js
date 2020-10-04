import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ProfileUser from '../ProfileUser';
import AddOng from '../AddOng';

const Tab = createBottomTabNavigator();

export default Profile = () => (
  <Tab.Navigator tabBar={() => <></>}>
    <Tab.Screen name="ProfileUser" component={ProfileUser} />
    <Tab.Screen name="AddOng" component={AddOng} />
  </Tab.Navigator>
);
