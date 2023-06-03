import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SendScreen from "../screens/send/SendScreen";
import SendingScreen from "../screens/send/SendingScreen";
import appStyles from "../styles/appStyles";

const Stack = createStackNavigator();

export default function SendStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        headerStyle: appStyles.headerStyle,
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen name="Send" component={SendScreen} />
      <Stack.Screen name="Sending" component={SendingScreen} />
    </Stack.Navigator>
  );
}
