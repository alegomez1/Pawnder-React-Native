import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux'

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import firebase from 'firebase'
import { setHasPet } from '../actions'


class AddPet extends React.Component {

    state = {
        name: 'Alpha',
        age: '',
        breed: '',
        bio: '',
        city: '',
        petPhotoURL: '',
        petPhoto: false,
        currentScreen: 'start',
        charactersUsed: 0,
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permission')
            }
        }
    }


    componentDidMount() {
        this.getPermissionAsync()
    }


    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            this.uploadDogImage(result)
        }
    }

    uploadDogImage = async (image) => {
        const files = image
        const data = new FormData()
        data.append('file', {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'testPhoto'
        })
        data.append('upload_preset', 'pawnderImage')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/pawnder/image/upload',
            {
                method: 'POST',
                body: data,
            }
        )
        const file = await res.json()
            .then((result) => {
                console.log('photo url-----', result.url)
                this.setState({petPhotoURL: result.url, petPhoto: true})
        })
    }

    uploadUserImage = async (image) => {
        const files = image
        const data = new FormData()
        data.append('file', {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'testPhoto'
        })
        data.append('upload_preset', 'pawnderImage')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/pawnder/image/upload',
            {
                method: 'POST',
                body: data,
            }
        )
        const file = await res.json()
        console.log('file-----', file)
    }

    addPetToDatabase = () => {
        firebase.database()
            .ref(`/users/${this.props.state.currentUser.uid}/pets`)
            .set({
                name: this.state.name,
                age: this.state.age,
                breed: this.state.breed,
                bio: this.state.bio,
                city: this.state.city.toLocaleLowerCase(),
                petPhotoURL: this.state.petPhotoURL,
                petPhoto: this.state.petPhoto
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
                            Who's your pet?</Text>
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

                        <TextInput
                            style={styles.nameTextField}
                            placeholder='City'
                            onChangeText={text => this.setState({ city: text })}
                        />

                        <TouchableOpacity
                            style={styles.uploadImageButton}
                            onPress={() => this.pickImage()}>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Pick Image</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={() => this.setState({ currentScreen: 'about' })}>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Next</Text>
                        </TouchableOpacity>



                        <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />


                    </View>
                )
                break;
            //About your pet
            case 'about':
                return (
                    <View style={[styles.centerAlign]}>
                        <Text style={styles.pageHeader}>About {this.state.name}</Text>
                        <View style={styles.aboutContainer}>
                            <TextInput
                                style={styles.aboutTextField}
                                placeholder="A little more about your pet"
                                multiline={true}
                                maxLength={250}
                                onChangeText={text => this.setBio(text)}
                            />
                            <Text style={{ textAlign: 'right' }}>{this.state.charactersUsed}/250</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={() => this.addPetToDatabase()}>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Done</Text>
                        </TouchableOpacity>

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

    setBio = (text) => {

        this.setState({
            bio: text,
            charactersUsed: text.length
        })
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
    aboutContainer: {
        marginTop: 130
    },
    aboutTextField: {
        width: 320,
        height: 120,
        borderWidth: 1
    },
    centerAlign: {
        flex: 1,
        alignItems: "center",
        // justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent:'center',
    },
    doneButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#09bf15',
        width: 90,
        height: 30,
        borderRadius: 10,
        borderWidth: 1
    },
    nameTextField: {
        marginBottom: 30,
        width: 200,
        height: 30,
        borderBottomWidth: 1,
        borderRadius: 5,
        textAlign: 'left'
    },
    nextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#09bf15',
        width: 90,
        height: 30,
        borderRadius: 10,
        borderWidth: 1
    },

    pageHeader: {
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
    },
    uploadImageButton:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ed9049',
        width: 90,
        height: 30,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 15,
    },

})