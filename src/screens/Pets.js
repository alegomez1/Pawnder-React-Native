import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'

class Pets extends React.Component {

    componentDidMount(){
        console.log('user uid', this.props.state.uid)
        firebase.database().ref(`/users/${this.props.state.uid}`)
        .once('value')
        .then((result)=>{
            console.log('result from reading db', result)
        })
    }
    render() {
        if(!this.props.state.userHasPet){
            return(
            <View style={styles.container}>
                <Text>No Pets</Text>
                <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('AddPetScreen')}
                >
                    <Text>Add a pet</Text>
                </TouchableOpacity>
            </View>
            )
        }else{
        return (
            <View style={styles.container}>
                <Text>Pets</Text>
            </View>
        )
    }
    }
}

const mapStateToProps = (state) => {
    return { state }
}
export default connect(mapStateToProps, {

})(Pets)

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    },

})