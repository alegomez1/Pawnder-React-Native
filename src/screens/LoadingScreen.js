import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'
import { setCurrentUser, setAllUsers } from '../actions'

class LoadingScreen extends React.Component {

    componentDidMount(){
        this.checkIfLoggedIn()
        this.getAllUsers()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user)
        {
            if(user){
                firebase.database().ref(`/users/${user.uid}`).once('value')
                .then((result)=>{
                    // console.log('loading result', result.val())
                    this.props.setCurrentUser(result.val())
                    this.props.navigation.navigate('Navigator')
                })
            }
            else{
                this.props.navigation.navigate('LoginScreen')
            }
        }.bind(this)
        )
    }

    getAllUsers = () => {
        firebase.database().ref('/users/').once('value')
        .then((result)=>{
          console.log('-----all users from db-----', result.val())

          let newMap = new Map([
              ['a', result.val()]
          ])
          
          console.log('single object', newMap)
        //   this.props.setAllUsers(result)
        })
      }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { state }
}
export default connect(mapStateToProps, {
    setCurrentUser,
    setAllUsers
})(LoadingScreen )

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    },

})