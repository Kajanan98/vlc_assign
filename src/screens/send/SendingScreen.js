import React from "react";
import { 
  Text, 
  View, 
  TouchableOpacity 
} from "react-native";
import { useEffect, useState ,useRef} from "react";
import { Camera } from "expo-camera";

import Ionicons from "react-native-vector-icons/Ionicons";
import { encodeToBin } from "../../utils/morse";
import useStyle from "../../hooks/useStyles";
import Message from "../../components/Message";

export default function SendingScreen({ navigation, route }) {
  // const [ready, setReady] = useState(false);
  const [message, setMessage] = useState(route.params.message);
  const [morseSequence, setMorseSequence] = useState(encodeToBin(message));
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const timeoutsList= useRef([])
  const [finished, setFinished] = useState(false);

  const styles = useStyle(customStyles)

  const onBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Send" }],
    });
  };

  const onTorch = () => {
    // console.log("Torch on");
    setFlashMode(Camera.Constants.FlashMode.torch);
  };

  const offTorch = () => {
    // console.log("Torch off");
    setFlashMode(Camera.Constants.FlashMode.off);
  };

  const sendData = async () => {
    setFinished(false);
    const unitTime = 1000;
    console.log(message, morseSequence);

    const startTime = new Date();
    let i = 0;
    let time = startTime;

    for (let j = 0; j < morseSequence.length; j++) {
      const timeout = setTimeout(() => {
        if (morseSequence[j]) {
          onTorch();
        } else {
          offTorch();
        }
        const now = new Date();
        // console.log((now - time) / 1000);
        time = now;
        if (j >= morseSequence.length - 1) {
          // const endTime = new Date();
          // console.log((endTime - startTime) / 1000);
          // console.log((unitTime * morseSequence.length) / 1000);
          setFinished(true);
        }
      }, unitTime * (j + 1));
      timeoutsList.current = timeoutsList.current.concat([timeout]);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");

      // setMorseSequence(morse(message));
      setTimeout(sendData, 500);
    })();
  }, []);

  useEffect(() => {
    return () => {
      console.log("Clearing Timeouts..", timeoutsList.current.length);
      for (let i = 0; i < timeoutsList.current.length; i++) {
        clearTimeout(timeoutsList.current[i]);
      }
    };
  }, []);

  if (!hasCameraPermission || !hasMicrophonePermission) {
    return <Text>Permission for camera not granted.</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Camera
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignSelf: "stretch",
          }}
          flashMode={flashMode}
        >
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onBack}>
                <Ionicons
                  name={"arrow-back"}
                  size={20}
                  color={"white"}
                  style={styles.messageIcon}
                />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>

            <Message message={message} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                disabled={!finished}
                onPress={() => sendData()}
              >
                <Text style={styles.buttonText}>Retry</Text>
                <Ionicons
                  name={"refresh"}
                  size={20}
                  color={"white"}
                  style={styles.messageIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}

const customStyles = theme =>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer:{
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor:theme.colors.primary,
    paddingHorizontal:60,
    maxWidth:300,
    margin:10,
    marginTop:30
    
  },
  buttonText:{
    color:'#ffffff',
    paddingRight:5,
    fontWeight:'800'
  },
  messageIcon:{
    
  }
});
