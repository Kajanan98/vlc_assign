import React, { useState } from 'react';

import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    FlatList 
} from 'react-native';

//components
import SearchBar from '../components/SearchBar';
import FriendCard from '../components/FriendCard';

//hooks
import useStyle from '../hooks/useStyles';


const ContactScreen = () => {

  const styles = useStyle(customStyles);

  const [friends, setFriends] = useState([
    { id: 1, name: 'Master Bruce Wayne', username: '@bruce', friends: 5, image: '../assets/images/profile.jpg'},
    { id: 2, name: 'Master Bruce Wayne', username: '@brucee', friends: 5, image: '../assets/images/profile.jpg'},
    { id: 3, name: 'Master Bruce Wayne', username: '@bruce2', friends: 5, image: '../assets/images/profile.jpg'},
    { id: 4, name: 'Master Bruce Wayne', username: '@bruce3', friends: 5, image: '../assets/images/profile.jpg'},
    { id: 5, name: 'Master Bruce Wayne', username: '@bruce3', friends: 5, image: '../assets/images/profile.jpg'},
    { id: 6, name: 'Master Bruce Wayne', username: '@bruce3', friends: 5, image: '../assets/images/profile.jpg'},
    { id: 7, name: 'Master Bruce Wayne', username: '@bruce3', friends: 5, image: '../assets/images/profile.jpg'},
   
  ]);

  

  const renderFriendItem = ({ item }) => (

    <FriendCard name={item.name} username={item.username} friends={item.friends} />
  )


  return (
    <View style={styles.container}>
      <SearchBar/>
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

const customStyles = theme => ({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop:40,
  },
  friendList: {
    flex: 1,
    paddingTop: 16,
  },
  continueButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor:  theme.colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ContactScreen;