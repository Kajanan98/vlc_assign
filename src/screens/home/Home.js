import React, { useState, useEffect, useContext } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native";

//components
import SearchBar from "../../components/SearchBar";


//hooks
import useStyle from "../../hooks/useStyles";
import firestore from "@react-native-firebase/firestore";
import LoadingScreen from "../../components/LoadingScreen";
import { AuthContext } from "../../contexts/AuthProvider";

const ContactScreen = ({ navigation }) => {
  const styles = useStyle(customStyles);
 
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([
    {
      id: 1,
      firstName: "Master Bruce",
      lastName: "Wayne",
      email: "@bruce",
      friends: 5,
      image: "../",
    },
    {
      id: 2,
      firstName: "Master Bruce",
      lastName: "Wayne",
      email: "@bruce",
      friends: 5,
      image: "../assets/images/profile.jpg",
    },
  ]);

  const { logout, deleteAccount, user, userDetails } = useContext(AuthContext);

  useEffect(() => {
    const onResult = (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((documentSnapshot) => {
        users.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
          friends: 5,
          image: "../assets/images/profile.jpg",
        });
      });
      setAllUsers(users);
      setLoading(false);
    };

    function onError(error) {
      console.log(error);
    }

    const subscriper = firestore()
      .collection("Users")
      .where("__name__", "!=", user.uid)
      .onSnapshot(onResult, onError);

    return () => subscriper();
  }, []);

  const onContactPress = (id) => {
    navigation.navigate("Message", {
      user: allUsers.find((user) => user.id == id),
    });
  };

  const renderFriendItem = ({ item }) => (
    <FriendCard
      name={`${item.firstName} ${item.lastName}`}
      email={item.email}
      friends={item.friends}
      id={item.id}
      onContactPress={onContactPress}
    />
  );

  if (loading) {
    console.log("userDetails",userDetails)
    return <LoadingScreen />;

  } else {
    return (
      <View style={styles.container}>
         <View style={styles.userContainer}>
        <View style={styles.header}>
          <Text style={styles.name}> {userDetails?.firstName
              ? `${userDetails.firstName} ${userDetails.lastName}`
              : "John Doe"}
          </Text>
          <Text style={styles.subText}>{userDetails?.email}</Text>
        </View>
        <Text style={styles.signOutText} onPress={logout}>
            Sign Out
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          //value={searchText}
          // onChangeText={handleSearch}
        />
      </View>
       
         <FlatList
        data={allUsers}
        renderItem={({ item }) => (
          <TouchableOpacity>
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={require('../../assets/images/profile.png')} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{item.firstName} {} {item.lastName}</Text>
              <Text style={styles.phoneText}>{item.email}</Text>
            </View>
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
        {/* <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}> See More</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
};


const customStyles = theme => ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor:'#fff',
    justifyContent: 'center',
  },
  userContainer:{
   
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  signOutText:{
    padding:10,
    paddingTop:20,
    color: theme.colors.danger,
    // fontWeight:800
  },
  name: {
    fontSize:20,
    // fontWeight:'bold',
    marginLeft:20,
    marginBottom:3,
  },
  subText: {
    fontSize:14,
    marginLeft:20,
    color:'#808080'
  },
  searchContainer: {
    backgroundColor: '#eee',
    padding: 8,
    
  },
  searchInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    // backgroundColor: theme.colors.primary,
    // tintColor: theme.colors.primary,
    // borderColor: theme.colors.primary,
    // borderWidth:1
    
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    // fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 16,
    color: '#999',
  },
})

export default ContactScreen;
