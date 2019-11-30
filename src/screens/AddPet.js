import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'
import { setHasPet } from '../actions'

class AddPet extends React.Component {

    state = {
        name: '',
        age: '',
        breed: '',
        city: '',
        currentScreen: 'start'
    }

    componentDidMount() {

    }
    addPetToDatabase = () => {
        firebase.database()
            .ref(`/users/${this.props.state.currentUser.uid}/pets`)
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
                firebase.database().ref(`/users/${this.props.state.currentUser.uid}`)
                    .update({ hasPet: true })
                this.props.navigation.navigate('LoadingScreen')
            })
    }

    addPetProcess = () => {
        switch (this.state.currentScreen) {
            //Pet name and breed
            case 'start':
                return (
                    <View style={[styles.centerAlign]}>
                        <Text style={styles.pageHeader}>
                            Tell us about your pet</Text>
                        <TextInput
                            style={styles.nameTextField}
                            placeholder='Pet Name'
                            onChangeText={text => this.setState({ name: text })}
                        />

<TextInput
                            style={styles.nameTextField}
                            placeholder='Breed'
                            onChangeText={text => this.setState({ breed: text })}
                        />

                        <TextInput
                            style={styles.nameTextField}
                            placeholder='Age'
                            keyboardType="number-pad"
                            onChangeText={text => this.setState({ age: text })}
                        />

                        <TouchableOpacity
                            onPress={() => this.setState({ currentScreen: 'name' })}>
                            <Text>Next</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            //About your pet
            case 'name':
                return (
                    <View style={[styles.centerAlign]}>

                        <Text>Name screen</Text>
                    </View>
                )
                break;
            default:
                return (
                    <View style={[styles.centerAlign]}>

                        <Text>Default screen</Text>
                    </View>
                )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.addPetProcess()}
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
    centerAlign: {
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent:'center',
    },
    nameTextField: {
        marginBottom: 30,
        width: 150,
        height: 30,
        borderBottomWidth: 1,
        borderRadius: 5,
        textAlign: 'left'
    },
    pageHeader:{
        marginTop: 60,
        marginBottom: 40,
        fontSize: 35,
        fontWeight: 'bold'
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