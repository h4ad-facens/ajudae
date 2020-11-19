import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ListOngs from '../ListOngs';
import OngDetail from '../OngDetail';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator tabBar={() => <></>}>
    <Tab.Screen name="ListOngs" component={ListOngs} />
    <Tab.Screen name="OngDetail" component={OngDetail} />
  </Tab.Navigator>
);
