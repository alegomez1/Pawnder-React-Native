import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

//Redux
import { store, persistor } from './src/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  console.log('test app', persistor)

    return (
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <AppNavigator/>
      </PersistGate>
      </Provider>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
