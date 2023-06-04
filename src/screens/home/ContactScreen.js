import React, { useState, useEffect, useContext } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

//components
import SearchBar from "../../components/SearchBar";
import FriendCard from "../../components/FriendCard";

//hooks
import useStyle from "../../hooks/useStyles";
import firestore from "@react-native-firebase/firestore";
import LoadingScreen from "../../components/LoadingScreen";
import { AuthContext } from "../../contexts/AuthProvider";

const ContactScreen = ({ navigation }) => {
  const styles = useStyle(customStyles);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([
    {
      id: 1,
      firstName: "Master Bruce",
      lastName: "Wayne",
      email: "@bruce",
      friends: 5,
      image: "../assets/images/profile.jpg",
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
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.container}>
        <SearchBar />
        <FlatList
          data={allUsers}
          style={styles.friendList}
          renderItem={renderFriendItem}
          //keyExtractor={(item) => item.username.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        />
        {/* <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}> See More</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
};

const customStyles = (theme) => ({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 40,
  },
  friendList: {
    flex: 1,
    paddingTop: 16,
  },
  continueButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ContactScreen;
