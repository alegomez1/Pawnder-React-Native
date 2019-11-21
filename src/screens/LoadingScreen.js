import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'
import { setCurrentUser } from '../actions'

class LoadingScreen extends React.Component {

    componentDidMount(){
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user)
        {
            if(user){
                firebase.database().ref(`/users/${user.uid}`).once('value')
                .then((result)=>{
                    this.props.setCurrentUser(result)
                    this.props.navigation.navigate('Navigator')
                })
            }
            else{
                this.props.navigation.navigate('LoginScreen')
            }
        }.bind(this)
        )
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
    setCurrentUser
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