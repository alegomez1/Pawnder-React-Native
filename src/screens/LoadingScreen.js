import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'

class LoadingScreen extends React.Component {

    componentDidMount(){
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user)
        
        {
            if(user){
                this.props.navigation.navigate('HomeScreen')
            }
            else{
                this.props.navigation.navigation('LoginScreen')
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