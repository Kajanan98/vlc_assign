
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnBoardingScreen";
import RegisterScreen from "../screens/SignUpScreen";


const AuthStack = () => {
    return ( 

        <Stack.Navigator screenOptions= {{ headerShown: false}}>

            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} /> 
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={RegisterScreen} />
           
        </Stack.Navigator>

     );
}
 
export default AuthStack;