import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'

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
                    <Text style={styles.pageHeader}>Pets</Text>
                    <ScrollView>
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
                                <Text style={{ textAlign: 'left', fontSize: 25, fontWeight: 'bold', marginLeft: 20 }}>{user.pets.name}</Text>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent:'center',
    },
    dogImage: {
        width: 70,
        height: 70,
        borderRadius: 35
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
        width: 200,
        height: 80,
        marginLeft: 15,
        // alignItems: 'center',
        justifyContent: 'center'
    },
    petNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red'
        marginLeft: 10,
    },
})