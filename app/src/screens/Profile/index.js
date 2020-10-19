import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import CausesExpired from '../CausesExpired';
import ProfileUser from '../ProfileUser';
import AddOng from '../AddOng';
import EditOng from '../EditOng';
import OngInfo from '../OngInfo';

const Tab = createBottomTabNavigator();

export default Profile = () => (
  <Tab.Navigator tabBar={() => <></>}>
    <Tab.Screen name="ProfileUser" component={ProfileUser} />
    <Tab.Screen name="AddOng" component={AddOng} />
    <Tab.Screen name="EditOng" component={EditOng} />
    <Tab.Screen name="OngInfo" component={OngInfo} />
    <Tab.Screen name="CausesExpired" component={CausesExpired} />
  </Tab.Navigator>
);
