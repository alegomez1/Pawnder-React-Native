import React from 'react'
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'




class AllPets extends React.Component {


    showPetNames = () => {
        return(

        this.props.state.allUsers.forEach(element => {
            // console.log('pet name', element.pets.name)
        return (<View><Text>element.pets.name</Text></View>)
        })

        )
    }


    render() {

        const allUsers = this.props.state.allUsers
        let allPets = []
        allUsers.forEach(element=>{
            allPets.push(<Text key={element.pets.name}>{element.pets.name}</Text>)
        })

        return (
            <View style={styles.container}>
                <TextInput style={styles.textbox}/>
                <Text>AllPets</Text>
                {allPets}
                
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { state }
}
export default connect(mapStateToProps, {

})(AllPets)

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    },
    textbox:{
        width: 200,
        height: 60,
        borderColor: 'black',
        borderWidth: 2
    }

})