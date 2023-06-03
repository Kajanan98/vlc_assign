import React, { useState, useEffect } from "react";

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

const ContactScreen = () => {
  const styles = useStyle(customStyles);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Master Bruce Wayne",
      username: "@bruce",
      friends: 5,
      image: "../assets/images/profile.jpg",
    },
    {
      id: 2,
      name: "Master Bruce Wayne",
      username: "@brucee",
      friends: 5,
      image: "../assets/images/profile.jpg",
    },
  ]);

  useEffect(() => {
    (async () => {
      const users = await firestore().collection("Users").get();
      // setFriends(users);
      setLoading(false);
    })();
  }, []);

  const renderFriendItem = ({ item }) => (
    <FriendCard
      name={item.name}
      username={item.username}
      friends={item.friends}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={friends}
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
