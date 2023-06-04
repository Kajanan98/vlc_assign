import React, { useRef } from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import useStyle from "../../hooks/useStyles";

const HEIGHT = Dimensions.get("window").height;

export default function Messages({ messages }) {
  const styles = useStyle(customStyles);
  const scrollViewRef = useRef();

  return (
    <View
      style={{
        ...styles.chatScrollWiewContainer,
        height: messages?.length
          ? Math.round(HEIGHT * 0.5)
          : Math.round(HEIGHT * 0.4),
      }}
    >
      <ScrollView
        style={styles.chatScrollWiew}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: false })
        }
      >
        {messages?.length ? (
          <>
            {messages.map((item, id) => (
              <View style={styles.activityItem} key={id}>
                <View style={styles.activityContent}>
                  <Text
                    style={{
                      ...styles.activityDescription,
                      textAlign: item.send ? "right" : "left",
                    }}
                  >
                    {item.message}
                  </Text>
                </View>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.startConvertationContainer}>
            <Text style={styles.startConvertation}>Start a conversation</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const customStyles = (theme) => ({
  chatScrollWiewContainer: {
    backgroundColor: "#d2dfe04f",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  chatScrollWiew: {},
  activityItem: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  activityContent: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 8,
    backgroundColor: "#7998a7c0",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  activityDescription: {
    fontSize: 16,
    marginBottom: 4,
  },
  startConvertationContainer: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  startConvertation: {
    fontSize: 24,
  },
});
