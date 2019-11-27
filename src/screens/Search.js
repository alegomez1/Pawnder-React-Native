import React from 'react'
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'


class Search extends React.Component {

    state={
        searchCity: '',
        search: false,
        actualResults: []
    }

    search = () =>{
        console.log('search func activated')
        let allUsers = this.props.state.allUsers
        allUsers.map(eachUser=>{
            if(eachUser.pets.city === this.state.searchCity){
                // console.log('added', eachUser)
                this.state.actualResults.push(eachUser)
            }
        })
        this.setState({search:true})
        this.displayPets()
    }

    displayPets = () => {
        let displayedResults
        displayedResults = this.state.actualResults.map((eachUser, i)=>{
            if((eachUser.pets.city === this.state.searchCity) && (this.state.search===true)){
                console.log('display func called')

                return (
                    <TouchableOpacity style={styles.petNameButton} key={i}>
                        <Text>{eachUser.pets.name}</Text>
                    </TouchableOpacity>
                )
            }
        })
        return displayedResults
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                style={styles.searchField}
                >
                <TextInput style={styles.textbox}
                placeholder="city"
                onChangeText={text => this.setState({ searchCity: text.toLocaleLowerCase() })}
                />
                {/* <TouchableOpacity
                onPress={()=> console.log('state', this.state)}
                >
                    <Text>Show state</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                onPress= {()=> this.search()}
                >
                    <Text>Search</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.petNameButton}>
                        <Text>Alpha</Text>
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

})(Search)

//Styles
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent:'center',
    },
    petNameButton:{

    },
    searchField:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    textbox:{
        marginRight: 10,
        textAlign: 'center',
        width: 300,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },

})