import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import useStyle from "../../hooks/useStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MessageScreen({ navigation, route }) {
  const [user, setUser] = useState(route.params.user);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const styles = useStyle(customStyles);

  const onBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Send" }],
    });
  };

  const onSend = () => {
    // sending(true)
    console.log(sending);
  };

  const renderSendMessage = () => {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <KeyboardAwareScrollView>
            <TextInput
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline={true}
              style={styles.inputMessage}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.readMessage}
                onPress={onSend}
                disabled={!message}
              >
                <Text style={styles.buttonText}>Send Message</Text>
                <FontAwesome
                  name={"send"}
                  size={20}
                  color={"white"}
                  style={styles.messageIcon}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  };
  const renderSending = () => {};

  return (
    <View style={styles.container}>
      {sending ? renderSending() : renderSendMessage()}
    </View>
  );
}

const customStyles = (theme) => ({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
  },
  inputMessage: {
    height: 45,
    fontSize: 14,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    margin: 20,
    paddingLeft: 15,
    width: "90%",
  },
  readMessage: {
    flexDirection: "row",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 60,
    maxWidth: 300,
  },
  buttonText: {
    color: "#ffffff",
    paddingRight: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
