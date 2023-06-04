import React from "react";
import { Text, StyleSheet } from "react-native";

export default LoadingScreen = ({ title, style = {}, ...props }) => {
  return <Text style={{ ...style }}>{title ? title : "Loading....."}</Text>;
};

const defaultStyles = StyleSheet.create({
  loading: {
    backgroundColor: "#f1f1f1",
    width: "80%",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#89b3c0",
  },
});
