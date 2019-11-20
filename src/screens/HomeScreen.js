import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux'

import {login} from '../actions'
import Signup from './Signup';

import firebase from 'firebase'


 class HomeScreen extends React.Component {
  render(){

  //   console.log('props---', this.props)
  let loggedIn = this.props.state.isLoggedIn
  // console.log('logged in:', loggedIn)


  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=> firebase.auth().signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
}


HomeScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => {
  return { state }
}
export default connect(mapStateToProps,{
  login
})(HomeScreen)

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
  },

});
