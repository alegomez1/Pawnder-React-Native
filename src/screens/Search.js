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
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'




class Search extends React.Component {
  state = {
    searchCity: "",
    search: false,
    actualResults: [],
    clickedOnUser: {
      pets: {
        name: "Alpha",
        age: 8
      }
    },
    isModalVisible: false,
    profileView: "about"
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
    await this.setModalFalse();
    this.setState({ clickedOnUser: clickedOnUser, isModalVisible: true });
    console.log("clickedOnUser", clickedOnUser);
  }

  profileView = () => {
    //About Tab
    if (this.state.profileView === "about") {
      return (
        <View style={styles.aboutPageContainer}>
          <Text style={styles.aboutSectionHeader}>
              {/* <Icon name="ios-book" size={14} color='black' marginRight={10}/> */}
           Bio</Text>
          <View style={styles.bioSectionContainer}>
            <Text>
              {this.state.clickedOnUser.pets.bio}
            </Text>
          </View>

          <Text style={styles.aboutSectionHeader}>Breed</Text>
          <View style={styles.breedSectionContainer}>
            <Text>
             {this.state.clickedOnUser.pets.breed}
            </Text>
          </View>
        </View>
      );
    }
    //Photos/Activity Tab
    else if (this.state.profileView === "photos") {
      return <Text>Photos Page</Text>;
    }
        //Extra Tab
        else if (this.state.profileView === "extra") {
          return <Text>Extra Page</Text>;
        }
  };

  render() {
    let clickedOnUser = this.state.clickedOnUser
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
            <LinearGradient 
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center'}}
            >
              <Image
                style={styles.dogImage}
                source={{
                  uri:
                    "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=1080"
                }}
              />
              <Text
                style={{
                  marginTop: 7,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                {clickedOnUser ? clickedOnUser.pets.name : 'Alpha' }
              </Text>
              <Text style={{color: '#f2f2f2', fontStyle:'italic'}}>{clickedOnUser? clickedOnUser.pets.breed : 'Border Collie'}</Text>
              </LinearGradient>
            </View>
            <View style={styles.profileNavigator}>
              <TouchableOpacity
                style={[styles.profileNavigatorButtonLeft, this.state.profileView==='about'? styles.profileNavigatorButtonSelected : styles.profileNavigatorButtonNotSelected]}
                onPress={() => this.setState({ profileView: "about" })}
              >
                <Text>About</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.profileNavigatorButtonMiddle, this.state.profileView==='photos'? styles.profileNavigatorButtonSelected : styles.profileNavigatorButtonNotSelected]}
                onPress={() => this.setState({ profileView: "photos" })}
              >
                <Text>Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={[styles.profileNavigatorButtonRight, this.state.profileView==='extra'? styles.profileNavigatorButtonSelected : styles.profileNavigatorButtonNotSelected]}
              onPress={()=> this.setState({profileView: "extra"})}>
                <Text>Extra</Text>
              </TouchableOpacity>
            </View>
            {this.profileView()}
          </View>
        </Modal>

        <View style={styles.searchField}>
          <TextInput
            style={styles.searchTextInput}
            placeholder="city"
            onChangeText={text =>
              this.setState({ searchCity: text.toLocaleLowerCase() })
            }
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.search()}>
            {/* <Text>Search</Text> */}
            {/* <Icon fontWeight= 'bold' name="ios-search" size={30} color='white'/> */}
            <Icon2 name='search' size={23} color='white' />
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
  aboutPageContainer: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: "#f4f4f4"
  },
  aboutSectionHeader: {
    color: '#4f4f4f',
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  bioSectionContainer: {
      paddingLeft:10,
      paddingRight: 10,
    width: Dimensions.get("window").width,
    height: 80,
    // backgroundColor: "#ffffff",
    justifyContent: "center",

    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 1,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 1.41,
    
    // elevation: 2,
  },
  breedSectionContainer: {
    paddingLeft:10,
    paddingRight: 10,
  // width: Dimensions.get("window").width,
  // height: 25,
  // backgroundColor: "#ffffff",
  // justifyContent: "center",

  // shadowColor: "#000",
  // shadowOffset: {
  //     width: 0,
  //     height: 1,
  // },
  // shadowOpacity: 0.20,
  // shadowRadius: 1.41,
  
  elevation: 2,
},
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center"
    // justifyContent:'center',
  },
  dogImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  dogImageContainer: {
    backgroundColor: "green",
    width: Dimensions.get("window").width,
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    flex: 1,
    backgroundColor: "#eaeaea",
    alignItems: 'center'
  },
  petInfoContainer: {
    marginLeft: 20
    // justifyContent: 'center'
  },
  profileNavigator: {
    flexDirection: "row",
    // backgroundColor: "red",
    marginTop:10,
    height:35,
    width: 390,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  profileNavigatorButtonLeft: {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#eaeaea",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  profileNavigatorButtonMiddle: {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#eaeaea",
    borderRightColor:'black',
    borderLeftColor: 'black',
    borderWidth: 1,
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  profileNavigatorButtonRight: {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#eaeaea",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  profileNavigatorButtonSelected:{
    backgroundColor: '#bfbfbf'
  },
  profileNavigatorButtonNotSelected:{
    backgroundColor: '#eaeaea'
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
  searchButton:{
    backgroundColor: '#2d7fe2',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRightWidth: 1,
    // borderLeftWidth: 1,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  searchField: {
    flexDirection:'row',
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2

    
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
  searchTextInput: {
    // marginRight: 10,
    textAlign: "center",
    width: 300,
    height: 40,
    borderColor: "black",
    // borderLeftWidth: 1,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    backgroundColor: 'white',




    // borderWidth: 1,
    // borderRadius: 10
  }
});
