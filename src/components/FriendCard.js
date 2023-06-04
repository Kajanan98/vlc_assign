import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';

import FontAwesome from "react-native-vector-icons/FontAwesome";

//custom hooks
import useStyle from '../hooks/useStyles';


const FriendCard = ({ name, email, friends, onContactPress, id }) => {
  const styles = useStyle(customStyles);

  return (
    <View style={styles.friendCard}>
      <Image
        source={require("../assets/images/profile.jpg")}
        style={styles.friendImage}
      />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{name}</Text>
        {/* <View style={styles.line} /> */}
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{ flex: 6 }}>
            <Text style={styles.friendUserName}> {email}</Text>
            <Text style={styles.friends}>
              {friends} <Text style={styles.friendsText}>mutual Friends</Text>
            </Text>
          </View>
          <View
            style={[
              styles.friendMessage,
              { flex: 1, transform: [{ translateY: -8 }] },
            ]}
          >
            <TouchableOpacity onPress={() => onContactPress(id)}>
              <FontAwesome name={"send"} size={28} style={styles.messageIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};



const customStyles = theme =>({


  friendCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  friendImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  friendUserName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  friends: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  friendsText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666',
  },
  friendMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  messageIcon:{
    color: theme.colors.primary
  },
  line: {
    height: 2,
    backgroundColor: theme.colors.primary, 
    marginVertical: 5,
  },
 
});

export default FriendCard;