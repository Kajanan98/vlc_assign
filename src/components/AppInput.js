import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default AppInput = ({ style, ...props }) => {
  return (
    <TextInput style={{ ...style, ...defaultStyles.textInput }} {...props} />
  );
};

const defaultStyles = StyleSheet.create({
  textInput: {
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
