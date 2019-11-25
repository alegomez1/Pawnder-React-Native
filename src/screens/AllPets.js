import React from 'react'
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'



class AllPets extends React.Component {

    state={
        city: ''
    }

    showPetNames = () => {
        return(

        this.props.state.allUsers.forEach(element => {
            // console.log('pet name', element.pets.name)
        return (<View><Text>element.pets.name</Text></View>)
        })

        )
    }

    displayPets = () => {
        let displayedResults
        const allUsers = this.props.state.allUsers
        displayedResults = allUsers.map((eachUser, i)=>{
            if(eachUser.pets.city === this.state.city){
                return (
                    <Text key={i}>{eachUser.pets.name} and {eachUser.pets.age}</Text>
                )
            }
        })
        return displayedResults
    }


    render() {

        const allUsers = this.props.state.allUsers
        console.log('allUsers', allUsers)
        let allPets = []
        allUsers.forEach(element=>{
            allPets.push(<Text key={element.pets.name}>{element.pets.name}</Text>)
        })

        return (
            <View style={styles.container}>
                <TextInput style={styles.textbox}
                placeholder="city"
                onChangeText={text => this.setState({ city: text.toLocaleLowerCase() })}
                />
                <Text>AllPets</Text>
                {allPets}
                <TouchableOpacity
                onPress={()=> console.log('state', this.state)}
                >
                    <Text>Show state</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=> console.log('search func', this.state)}
                >
                    <Text>Search</Text>
                </TouchableOpacity>
                {this.displayPets()}
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