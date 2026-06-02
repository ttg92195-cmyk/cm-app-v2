// ============================================
// MovieStreamApp - Main Entry Point
// ============================================

import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppNavigator />
    </>
  );
};

export default App;
