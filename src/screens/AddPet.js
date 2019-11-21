import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'
import { TextInput } from 'react-native-gesture-handler'
import { setHasPet } from '../actions'

class AddPet extends React.Component {

    state={
        name: ''
    }

    componentDidMount(){
        console.log('user uid', this.props.state.uid)
        firebase.database().ref(`/users/${this.props.state.uid}`)
        .once('value')
        .then((result)=>{
            console.log('result from reading db', result)
        })
    }
    addPetToDatabase = () => {
        console.log('add to db func called')
        firebase.database()
                    .ref(`/users/${this.props.state.uid}/pets`)
                    .set({
                        name: this.state.name
                    })
                    .then(()=>{
                        console.log('created pet in users database')
                        this.props.setHasPet(true)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    .then(()=>{
                        firebase.database().ref(`/users/${this.props.state.uid}`)
                        .update({hasPet:true})
                        this.props.navigation.navigate('Navigator')
                    })
    }







    render() {
        console.log('props----', this.props.state)
        return (
            <View style={styles.container}>
                <Text>Add Pet Page</Text>
                <TextInput style={styles.textBox}
                    onChangeText={text => this.setState({name:text})}
                />
                <TouchableOpacity
                onPress={()=> console.log('state--', this.state)}>
                    <Text>View State</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=> this.addPetToDatabase()}>
                    <Text>Add pet</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { state }
}
export default connect(mapStateToProps, {
setHasPet
})(AddPet)

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent:'center',
        paddingTop: 100
    },
    textBox: {
        borderWidth: 1,
        borderColor: 'black',
        width: 200,
        height: 40,
    }

})