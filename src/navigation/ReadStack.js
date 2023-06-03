import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import appStyles from "../styles/appStyles";
import ReadScreen from "../screens/read/ReadScreen";
import ReadingScreen from "../screens/read/ReadingScreen";

const Stack = createStackNavigator();

export default function ReadStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        headerStyle: appStyles.headerStyle,
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen name="Read" component={ReadScreen} />
      <Stack.Screen name="Reading" component={ReadingScreen} />
    </Stack.Navigator>
  );
}
