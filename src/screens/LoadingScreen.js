import React from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'

class LoadingScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { state }
}
export default connect(mapStateToProps, {

})(LoadingScreen )

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    },

})