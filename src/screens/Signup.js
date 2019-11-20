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




 class Signup extends React.Component {
  render(){
    return(
        <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.props.login(true)}>
            <Text>Login</Text>
        </TouchableOpacity>
        </View>
    )
}
}

const mapStateToProps = (state) => {
  return { state }
}
export default connect(mapStateToProps,{
    login

})(Signup)

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
  },
});
