import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default LoadingScreen = ({ title, ...props }) => {
  return (
    <View style={defaultStyles.loadingContainer}>
      <Text style={defaultStyles.loading}>
        {title ? title : "Loading....."}
      </Text>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    backgroundColor: "#f1f1f1",
    fontSize: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
  },
});
