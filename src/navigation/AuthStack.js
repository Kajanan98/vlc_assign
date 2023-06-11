
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import LoginScreen from "../screens/LoginScreen";
import Home from "../screens/Home";
import RegisterScreen from "../screens/SignUpScreen";


const AuthStack = () => {
    return ( 

        <Stack.Navigator screenOptions= {{ headerShown: false}}>

            <Stack.Screen name="Home" component={Home} /> 
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={RegisterScreen} />
           
        </Stack.Navigator>

     );
}
 
export default AuthStack;