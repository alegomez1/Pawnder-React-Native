import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { connect } from "react-redux";

class Search extends React.Component {
  state = {
    searchCity: "",
    search: false,
    actualResults: [],
    clickedOnUser: {
        pets:{
            name:'Alpha',
            age: 8
        }
    },
    isModalVisible: true
  };

  search = () => {
    let allUsers = this.props.state.allUsers;
    allUsers.map(eachUser => {
      if (eachUser.pets.city === this.state.searchCity) {
        this.state.actualResults.push(eachUser);
      }
    });
    this.setState({ search: true });
    this.displayPets();
  };

  displayPets = () => {
    let displayedResults;
    displayedResults = this.state.actualResults.map((eachUser, i) => {
      if (
        eachUser.pets.city === this.state.searchCity &&
        this.state.search === true
      ) {
        // console.log("display func called");

        return (
          <TouchableOpacity
            style={styles.searchResultContainer}
            key={i}
            onPress={() => this.showModal(eachUser)}
          >
            <View style={styles.resultContainer}>
              <Image
                style={styles.resultImage}
                source={{
                  uri:
                    "https://facebook.github.io/react-native/img/tiny_logo.png"
                }}
              />
              <View style={styles.petInfoContainer}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 5 }}
                >
                  {eachUser.pets.name}
                </Text>
                <Text style={{ paddingBottom: 5 }}>
                  Breed: {eachUser.pets.breed}
                </Text>
                <Text style={{ paddingBottom: 5 }}>
                  Age: {eachUser.pets.age} years old
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    });
    return displayedResults;
  };

  setModalFalse = () => {
    this.setState({ isModalVisible: false });
  };
 async showModal(clickedOnUser) {
     await this.setModalFalse()
     this.setState({clickedOnUser: clickedOnUser, isModalVisible: true})
     console.log('clickedOnUser', clickedOnUser)
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          presentationStyle={"formSheet"}
          visible={this.state.isModalVisible}
          onDismiss={() => console.log("modal dismissed")}
        >
          <View style={styles.modal}>
            <View style={styles.dogImageContainer}>
                <Image
                style={styles.dogImage}
                source={{uri:"https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=1080"}}/>
            </View>
            <Text style={{marginLeft: 10, fontSize: 33, fontWeight: 'bold', marginTop: 15}}>{this.state.clickedOnUser.pets.name}</Text>
            <Text style={{marginLeft: 10, fontSize: 25, marginTop: 10}}>About</Text>
          </View>
        </Modal>

        <View style={styles.searchField}>
          <TextInput
            style={styles.textbox}
            placeholder="city"
            onChangeText={text =>
              this.setState({ searchCity: text.toLocaleLowerCase() })
            }
          />
          <TouchableOpacity onPress={() => this.search()}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <TouchableOpacity
            style={styles.searchResultContainer}
            onPress={() => this.showModal()}
          >
            <View style={styles.resultContainer}>
              <Image
                style={styles.resultImage}
                source={{
                  uri:
                    "https://facebook.github.io/react-native/img/tiny_logo.png"
                }}
              />
              <View style={styles.petInfoContainer}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 5 }}
                >
                  Alpha
                </Text>
                <Text style={{ paddingBottom: 5 }}>Breed: Border Collie</Text>
                <Text style={{ paddingBottom: 5 }}>Age: 8 years old</Text>
              </View>
            </View>
          </TouchableOpacity>
          {this.displayPets()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};
export default connect(mapStateToProps, {})(Search);

//Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center"
    // justifyContent:'center',
  },
  dogImage:{
    width: Dimensions.get('window').width,
    height: 150
  },
  dogImageContainer:{
    backgroundColor:'green',
    width: Dimensions.get('window').width,
    height: 150
  },
  modal:{
    flex: 1,
    backgroundColor: '#eaeaea'
  },
  petInfoContainer: {
    marginLeft: 20
    // justifyContent: 'center'
  },
  resultContainer: {
    marginLeft: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  resultImage: {
    width: 50,
    height: 50,
    justifyContent: "center"
  },
  searchField: {
    // flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  searchResultContainer: {
    marginTop: 20,
    backgroundColor: "white",
    width: 390,
    height: 80,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  textbox: {
    marginRight: 10,
    textAlign: "center",
    width: 300,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10
  }
});
