import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'

class Pets extends React.Component {

    componentDidMount(){
        console.log('user uid', this.props.state.setUID)
        firebase.database().ref(`/users/${this.props.state.setUID}`)
        .once('value')
        .then((result)=>{
            console.log('result from reading db', result)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Pets</Text>
            </View>
        )
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