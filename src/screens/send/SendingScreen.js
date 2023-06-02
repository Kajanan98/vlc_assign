import { StyleSheet, Text, View, Button } from "react-native";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";

import AppButton from "../../components/AppButton";
import { Platform } from "react-native";
import { encodeToBin } from "../../utils/morse";

export default function SendingScreen({ navigation, route }) {
  const [message, setMessage] = useState(route.params.message);
  const [morseSequence, setMorseSequence] = useState(encodeToBin(message));
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

  const onBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Send" }],
    });
  };

  const onTorch = () => {
    console.log("Torch on");
    setFlashMode(Camera.Constants.FlashMode.torch);
  };

  const offTorch = () => {
    console.log("Torch off");
    setFlashMode(Camera.Constants.FlashMode.off);
  };

  // const sendData = async () => {
  //   const unitTime = 1000;
  //   console.log(morseSequence);
  //   const wait = async (unitTime) => {
  //     await new Promise((resolve) => setTimeout(resolve, unitTime));
  //     // Code to execute after waiting for 100 milliseconds
  //     console.log(`Waited for ${unitTime}ms`);
  //   };
  //   const startTime = new Date();
  //   for (let i = 0; i < morseSequence.length; i++) {
  //     const code = morseSequence[i];
  //     if (code == ".") {
  //       onTorch();
  //       await wait(unitTime);
  //       offTorch();
  //     } else if (code == "-") {
  //       onTorch();
  //       await wait(2 * unitTime);
  //       offTorch();
  //     }
  //     await wait(unitTime);
  //   }
  //   const endTime = new Date();
  //   console.log((endTime - startTime) / 1000);
  // };

  // const sendData = async () => {
  //   const unitTime = 100;
  //   console.log(morseSequence);

  //   const startTime = new Date();
  //   let i = 0;
  //   let time = startTime;
  //   const interval = setInterval(() => {
  //     const time2 = new Date();
  //     console.log((time2 - time) / 1000);
  //     time = time2;
  //     if (morseSequence[i]) {
  //       onTorch();
  //     } else {
  //       offTorch();
  //     }
  //     i++;
  //     if (i >= morseSequence.length) {
  //       const endTime = new Date();
  //       console.log((endTime - startTime) / 1000);
  //       console.log((unitTime * morseSequence.length) / 1000);
  //       clearInterval(interval);
  //     }
  //   }, unitTime);
  // };

  const sendData = async () => {
    const unitTime = 100;
    console.log(morseSequence);

    const startTime = new Date();
    let i = 0;
    let time = startTime;

    for (let j = 0; j < morseSequence.length; j++) {
      setTimeout(() => {
        if (morseSequence[j]) {
          onTorch();
        } else {
          offTorch();
        }
        if (j >= morseSequence.length - 1) {
          const endTime = new Date();
          console.log((endTime - startTime) / 1000);
          console.log((unitTime * morseSequence.length) / 1000);
        }
      }, unitTime * (j + 1));
    }
  };

  useEffect(() => {
    (async () => {
      console.log("Permission starting");
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      console.log(cameraPermission.status);
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      console.log(microphonePermission.status);

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
    })();

    // setMorseSequence(morse(message));
    setTimeout(sendData, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        style={{ flex: 1, width: "100%", height: "100%", alignSelf: "stretch" }}
        flashMode={flashMode}
      >
        <View style={styles.container}>
          <Text>{message}</Text>
          <AppButton title={"Back"} onPress={onBack} />
          <Button title={"Retry"} onPress={() => sendData()} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
