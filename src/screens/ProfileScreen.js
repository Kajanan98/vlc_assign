import {  
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
import React, {useContext} from 'react';

import RecentActivity from "../components/RecentActivity";

import { AuthContext } from "../contexts/AuthProvider";

import useStyle from "../hooks/useStyles";


export default function ProfileScreen() {

  const { logout, deleteAccount, user, userDetails } = useContext(AuthContext);

  const styles = useStyle(customStyles);

  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <View>
          <Image
            source={require("../assets/images/profile.jpg")}
            style={styles.userPhoto}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {userDetails?.firstName || "John Doe"}
          </Text>
          <Text style={styles.userFollowers}>1000 followers</Text>
        </View>
        <Text style={styles.signOutText} onPress={logout}>
          Sign Out
        </Text>
        {/* <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity> */}
      </View>
      <ScrollView>
        <RecentActivity />
        <View style={styles.deactivateButton}>
          <TouchableOpacity style={styles.deactivate} onPress={deleteAccount}>
            <Text
              style={{
                color: "#ffffff",
                paddingHorizontal: 60,
              }}
            >
              {" "}
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const customStyles = (theme) => ({
  container: {
    flex: 1,
    flexDirection:"column",
    marginTop:40,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
    
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  userFollowers: {
    color: '#999',
  },
  signOut: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#008B8B',
  },
  signOutText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  deactivateButton: {
    margin: 20,
    marginHorizontal:50,
    marginTop:5,
  },
  deactivate: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: theme.colors.danger,
  },
});