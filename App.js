import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

//Redux
import { store, persistor } from './src/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// import AppNavigator from './navigation/AppNavigator';

import { createAppContainer, createSwitchNavigator} from 'react-navigation'

import LoginScreen from './src/screens/LoginScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import HomeScreen from './src/screens/HomeScreen'

import firebase from 'firebase'
import firebaseConfig from './config'
firebase.initializeApp(firebaseConfig)


const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  HomeScreen:HomeScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

export default class App extends React.Component {

  
    
    render(){
    return (
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <AppNavigator/>
      </PersistGate>
      </Provider>
    );
  }}

//Styles
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:'center',
  },

})



// export default class App extends React.Component {
    
//   render(){
//   return (
//     <Provider store={store}>
//     <PersistGate persistor={persistor}>
//     <AppNavigator/>
//     </PersistGate>
//     </Provider>
//   );
// }}
