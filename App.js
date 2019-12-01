import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

//Redux
import { store, persistor } from './src/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Icon from 'react-native-vector-icons/Ionicons'

import { createAppContainer, createSwitchNavigator} from 'react-navigation'

import LoginScreen from './src/screens/LoginScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import HomeScreen from './src/screens/HomeScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import Pets from './src/screens/Pets'
import AddPetScreen from './src/screens/AddPet'
import Search from './src/screens/Search'

import firebase from 'firebase'
import firebaseConfig from './src/config'

firebase.initializeApp(firebaseConfig)

const tabNavigator = createBottomTabNavigator(

  {
    Pets:{
      screen: Pets,
      navigationOptions: {
        tabBarLabel:"Pets",
        tabBarIcon:(
          <Icon marginTop={20} name="ios-paw" size={24} color='white'/>
        )
      },
    },
    Search:{
      screen: Search,
      navigationOptions: {
        tabBarLabel:"Search",
        tabBarIcon:(
          <Icon marginTop={20} name="ios-star" size={24} color='white'/>
        )
      },
    },
        Home:{
          screen: HomeScreen,
          navigationOptions: {
            iconStyle:{
              paddingTop: 30
            },
            tabBarLabel:"Home",
            tabBarIcon:(
              <Icon name="ios-home" size={24} color='white' containerStyle={{ marginTop: 6 }}/>
            )
          },
        },
        Settings:{
          screen: SettingsScreen,
          navigationOptions: {
            tabBarLabel:"Settings",
            tabBarIcon:(
              <Icon marginTop={20} name="ios-settings" size={24} color='white'/>
            )
          },
        },
      },
      {
        tabBarOptions: {
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginTop: 30,
          paddingTop: 20,
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          style:{
          backgroundColor: 'rgba(51, 51, 51, 0.9)',
          paddingTop: 10,
          paddingBottom: 30
          },
          labelStyle:{
            // paddingTop:10,
          fontSize: 10,
          fontWeight: 'bold',
          }
        },
      }
)

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  AddPetScreen:AddPetScreen,
  LoginScreen:LoginScreen,
  HomeScreen:HomeScreen,
  Navigator:tabNavigator
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
