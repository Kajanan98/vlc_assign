import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState } from "react";
import useStyle from "../../hooks/useStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MessageSending from "./MessageSending";
import MessageReading from "./MessageReading";
import Messages from "./Messages";

export default function MessageScreen({ navigation, route }) {
  const [user, setUser] = useState(route.params.user);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [reading, setReading] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Hi", send: true },
    { message: "Hello", send: false },
    { message: "How are you", send: true },
    { message: "Fine", send: false },
  ]);

  const styles = useStyle(customStyles);

  const onBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Send" }],
    });
  };

  const onSend = () => {
    setSending(true);
    setMessages((prev) => prev.concat([{ message: message, send: true }]));
    console.log(sending);
  };

  const onSendStop = () => {
    setSending(false);
    setMessage("");
    console.log(sending);
  };

  const onRead = () => {
    setReading(true);
    console.log(reading);
  };

  const onReadStop = () => {
    setReading(false);
    console.log(reading);
  };

  const onReadFinish = (message) => {
    setMessages((prev) => prev.concat([{ message: message, send: false }]));
    setReading(false);
    console.log(message);
  };

  const renderSendReadButtons = () => {
    return (
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
            <TouchableOpacity style={styles.readMessage} onPress={onRead}>
              <Text style={styles.buttonText}>Read Message</Text>
              <FontAwesome
                name="book"
                size={24}
                color="white"
                style={styles.readButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    );
  };

  if (sending) {
    return (
      <View style={styles.container}>
        <MessageSending message={message} onSendStop={onSendStop} />
      </View>
    );
  } else if (reading) {
    return (
      <View style={styles.container}>
        <MessageReading onReadStop={onReadStop} onReadFinish={onReadFinish} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.userCard}>
          <View>
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.userPhoto}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user?.firstName
                ? `${user.firstName} ${user.lastName}`
                : "John Doe"}
            </Text>
          </View>
        </View>
        <Messages messages={messages} />
        {renderSendReadButtons()}
      </View>
    );
  }
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
    marginBottom: 10,
    marginTop: 0,
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
    margin: 5,
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
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
});
