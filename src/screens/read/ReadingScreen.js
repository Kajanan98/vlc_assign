import React from "react";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Camera } from "expo-camera";
import ReadingScreenTF from "./ReadingScreenTF";

export default function ReadingScreen({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();

  const onBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Read" }],
    });
  };

  useEffect(() => {
    (async () => {
      console.log("Permission starting");
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      console.log(cameraPermission.status);
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Permission Plz.</Text>;
  } else {
    return <ReadingScreenTF onBack={onBack}/>;
  }
}
