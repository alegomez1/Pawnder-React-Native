import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'
import { setCurrentUser, setAllUsers } from '../actions'

class LoadingScreen extends React.Component {

    componentDidMount() {
        this.checkIfLoggedIn()
        this.getAllUsers()
    }
    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.database().ref(`/users/${user.uid}`).once('value')
                    .then((result) => {
                        this.props.setCurrentUser(result.val())
                        if(result.val().hasPet === false){
                            console.log('NO PET NO PET')
                            this.props.navigation.navigate('AddPetScreen')
                        }else{
                            this.props.navigation.navigate('Navigator')
                        }
                        
                    })
            }
            else {
                this.props.navigation.navigate('LoginScreen')
            }
        }.bind(this)
        )
    }

    getAllUsers = () => {
        let allUsers = []
        firebase.database().ref('/users/').on('value', (eachUser) => {
            eachUser.forEach((child) => {
                // console.log('user---', child.val())
                allUsers.push(child.val())
            })
            this.props.setAllUsers(allUsers)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
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
})(LoadingScreen)

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

})