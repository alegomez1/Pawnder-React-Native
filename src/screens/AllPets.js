import React from 'react'
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'


class AllPets extends React.Component {

    state={
        city: '',
        search: false,
        actualResults: []
    }

    search = () =>{
        console.log('search func activated')
        let allUsers = this.props.state.allUsers
        allUsers.map(eachUser=>{
            if(eachUser.pets.city === this.state.city){
                // console.log('added', eachUser)
                this.state.actualResults.push(eachUser)
            }
        })
        this.setState({search:true})
        this.displayPets()
    }

    displayPets = () => {
        let displayedResults
        // const allUsers = this.props.state.allUsers
        displayedResults = this.state.actualResults.map((eachUser, i)=>{
            if((eachUser.pets.city === this.state.city) && (this.state.search===true)){
                // console.log('added this one', eachUser)
                console.log('display func called')

                return (
                    <Text key={i}>{eachUser.pets.name} and {eachUser.pets.age}</Text>
                )
            }
        })
        return displayedResults
    }


    render() {


        return (
            <View style={styles.container}>
                <TextInput style={styles.textbox}
                placeholder="city"
                onChangeText={text => this.setState({ city: text.toLocaleLowerCase() })}
                />
                <Text>AllPets</Text>
                <TouchableOpacity
                onPress={()=> console.log('state', this.state)}
                >
                    <Text>Show state</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress= {()=> this.search()}
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