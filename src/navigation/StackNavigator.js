import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Hello from '../Screens/Hello';
import {ROUTE} from '../constant';
import End from '../Screens/End';
import Home from '../Screens/Home';

const StackNavigator = params => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ROUTE.HELLO} component={Hello} />
      <Stack.Screen name={ROUTE.HOME} component={Home} />

      <Stack.Screen name={ROUTE.END} component={End} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
