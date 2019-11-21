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

import { login } from '../actions'

class HomeScreen extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <Text>Home page</Text>
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
export default connect(mapStateToProps, {
  login
})(HomeScreen)

//Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
  },

});
