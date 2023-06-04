import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

import { AuthContext } from "../contexts/AuthProvider";



function Main() {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
    { ! isLoggedIn ?
      <AuthStack/>
      :
      <AppStack/>
    }
    </NavigationContainer>
      
    
  );
}

const styles = StyleSheet.create({
  tabBarNormal: {
    height: 70,
    backgroundColor: "#ffffff",
  },
  tabBar: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    elevation: 0,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    height: 70,
  },
  tabBarShadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Main;
