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
  Dimensions
} from 'react-native';

import { connect } from 'react-redux'
import { login } from '../actions'

import firebase from 'firebase'

class HomeScreen extends React.Component {

  componentDidMount() {

  }


  render() {

    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.pageHeader}>Home
      </Text>

        </View>

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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    // justifyContent: 'center'
  },
  headerView: {
    width: Dimensions.get('window').width,
    // backgroundColor: 'red',
  },
  pageHeader: {
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
    fontSize: 35,
    fontWeight: 'bold'
  },

});
