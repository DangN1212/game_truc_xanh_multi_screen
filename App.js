/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
// import moduleName from './src/navigation'
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StackNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
