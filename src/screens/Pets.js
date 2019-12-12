import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'
import { bold } from 'ansi-colors'

class Pets extends React.Component {

    render() {
        const user = this.props.state.currentUser

        // console.log('in pets', this.props.state.currentUser)
        if (!this.props.state.currentUser.hasPet) {
            return (
                <View style={styles.container}>
                    <Text>No Pets</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddPetScreen')}
                    >
                        <Text>Add a pet</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.headerView}>
                    <Text style={styles.pageHeader}>Pets
                    </Text>
                    
                    </View>
                    <ScrollView style={styles.scrollViewContainer}>
                    {/* List of pets the user has */}
                        <TouchableOpacity
                            style={styles.petNameButton}
                            onPress={() => console.log('pressed pet name')}>
                            <View style={styles.petNameContainer}>
                                <Image
                                    style={styles.dogImage}
                                    source={{
                                        uri:
                                            user.pets.petPhotoURL
                                    }}
                                />
                                <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold', marginLeft: 20 }}>{user.pets.name}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Add pet button */}
                        <TouchableOpacity
                            style={styles.addPetButton}
                            onPress={() => console.log('pressed pet name')}>
                            <View style={styles.addPetContainer}>
                                <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold', marginLeft: 20 }}>+ Add Pet</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
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
    addPetButton:{
        marginTop: 20,
        backgroundColor: '#61b728',
        borderRadius: 10,
        width: Dimensions.get('window').width - 150,
        height: 50,
        justifyContent: 'center',
        alignItems: "center",
        textAlign: 'center'
    },
    addPetContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        // justifyContent: 'center'
    },
    dogImage: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    headerView:{
        width: Dimensions.get('window').width,
        // backgroundColor: 'red',
    },
    pageHeader: {
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 20,
        fontSize: 35,
        fontWeight: 'bold'
    },
    petNameButton: {
        backgroundColor: '#efefef',
        borderRadius: 10,
        width: Dimensions.get('window').width - 50,
        height: 120,
        // marginLeft: 15,
        justifyContent: 'center'
    },
    petNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        // backgroundColor: 'red'
    },
    scrollViewContainer:{
        // backgroundColor: 'red',
        // alignItems: 'center'
    }
})