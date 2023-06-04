import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import appStyles from "../styles/appStyles";
import ContactScreen from "../screens/home/ContactScreen";
import MessageScreen from "../screens/home/MessageScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        headerStyle: appStyles.headerStyle,
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
    </Stack.Navigator>
  );
}
