import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import CauseDetail from '../CauseDetail';
import ListCauses from '../ListCauses';
const Tab = createBottomTabNavigator();

const Causes = () => (
  <Tab.Navigator tabBar={() => <></>}>
    <Tab.Screen name="ListCauses" component={ListCauses} />
    <Tab.Screen name="CauseDetail" component={CauseDetail} />
  </Tab.Navigator>
);

export default Causes;
