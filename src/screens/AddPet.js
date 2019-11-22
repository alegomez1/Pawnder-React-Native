import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'
import { TextInput } from 'react-native-gesture-handler'
import { setHasPet } from '../actions'

class AddPet extends React.Component {

    state = {
        name: '',
        age:'',
        breed: '',
        city: '',
    }

    componentDidMount() {
        firebase.database().ref(`/users/${this.props.state.uid}`)
            .once('value')
            .then((result) => {
                // console.log('result from reading db', result)
            })
    }
    addPetToDatabase = () => {
        // console.log('add to db func called')
        firebase.database()
            .ref(`/users/${this.props.state.uid}/pets`)
            .set({
                name: this.state.name,
                age: this.state.age,
                breed: this.state.breed,
                city: this.state.city.toLocaleLowerCase()
            })
            .then(() => {
                this.props.setHasPet(true)
            })
            .catch((err) => {
                console.log(err)
            })
            .then(() => {
                firebase.database().ref(`/users/${this.props.state.uid}`)
                    .update({ hasPet: true })
                this.props.navigation.navigate('LoadingScreen')
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Add Pet Page</Text>
                {/* Name */}
                <TextInput style={styles.textBox}
                    placeholder="name"
                    onChangeText={text => this.setState({ name: text })}
                />
                {/* Age */}
                <TextInput style={styles.textBox}
                    placeholder="age"
                    onChangeText={text => this.setState({ age: text })}
                />
                {/* Breed */}
                <TextInput style={styles.textBox}
                    placeholder="breed"
                    onChangeText={text => this.setState({ breed: text })}
                />
                {/* City */}
                <TextInput style={styles.textBox}
                    placeholder="city"
                    onChangeText={text => this.setState({ city: text })}
                />
                <TouchableOpacity
                    onPress={() => console.log('state--', this.state)}>
                    <Text>View State</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.addPetToDatabase()}>
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
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
        width: 200,
        height: 40,
        textAlign: 'center',
        fontSize: 20
    }

})