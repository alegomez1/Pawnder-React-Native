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

import { setUID } from '../actions'

import firebase from 'firebase'

class SettingsScreen extends React.Component {
  render() {

    return (


      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.pageHeader}>Settings
</Text>

        </View>
        <TouchableOpacity
          onPress={() => firebase.auth().signOut()}>
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
export default connect(mapStateToProps, {
  setUID
})(SettingsScreen)

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
