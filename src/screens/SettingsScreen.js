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

import firebase from 'firebase'

 class SettingsScreen extends React.Component {
  render(){

  return (
    <View style={styles.container}>
      <Text>Settings page</Text>
      <TouchableOpacity
      onPress={()=> firebase.auth().signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
}

SettingsScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => {
  return { state }
}
export default connect(mapStateToProps,{
  login
})(SettingsScreen)

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
  },

});
