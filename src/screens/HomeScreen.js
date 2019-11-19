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


 class HomeScreen extends React.Component {
  render(){

    console.log('props---', this.props)
  let loggedIn = this.props.state.isLoggedIn
  console.log('logged in:', loggedIn)

  if(loggedIn){
    return(
      <View style={styles.container}>
        <Text>Logged in!</Text>
        <TouchableOpacity onPress={()=>this.props.login(false)}>
        <Text>Logout</Text>

        </TouchableOpacity>
      </View>
    )
  }
  else{
  return (
    <Signup/>
  );
}
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
