import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default AppButton = ({
  onPress,
  title,
  disabled = false,
  textStyle = {},
  containerStyle = {},
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={{
      backgroundColor: disabled ? "#5ea4ee" : "#007bff",
      ...styles.appButtonContainer,
      ...styles.shadow,
      ...containerStyle,
    }}
  >
    <Text style={{ ...styles.appButtonText, ...textStyle }}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
  },
  shadow: {
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
