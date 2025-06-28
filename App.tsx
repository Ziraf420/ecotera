/**
 * Ecoterra - React Native App
 * 
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import tema
import './src/style/theme';

// Abaikan warning tertentu jika perlu
LogBox.ignoreLogs(['Reanimated 2']);

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={EStyleSheet.value('$backgroundColor')} />
      <AppNavigator />
    </>
  );
}

export default App;
