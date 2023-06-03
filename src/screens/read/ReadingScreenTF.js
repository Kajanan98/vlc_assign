import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";

import { Camera } from "expo-camera";

import * as tf from "@tensorflow/tfjs";

import { cameraWithTensors } from "@tensorflow/tfjs-react-native";

import * as mobilenet from "@tensorflow-models/mobilenet";

import { decodeToBin, decodeBinToMessage } from "../../utils/vlc/decode";
import ShowMessage from "./ShowMessage";

// tslint:disable-next-line: variable-name
const TensorCamera = cameraWithTensors(Camera);

const IS_ANDROID = Platform.OS === "android";
const IS_IOS = Platform.OS === "ios";

const CAM_PREVIEW_WIDTH = Dimensions.get("window").width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

const OUTPUT_TENSOR_WIDTH = 180;
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

const unitTime = 1000
export default function ReadingScreenTF({onBack}) {
  const cameraRef = useRef(null);
  const [tfReady, setTfReady] = useState(false);
  const [startedScanning, setStartedScanning] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState(null);
  const [model, setModel] = useState();
  const [fps, setFps] = useState(0);
  const [spot, setSpot] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [receivedData, setReceivedData] = useState([]);

  const rafId = useRef(null);

  useEffect(() => {
    async function prepare() {
      rafId.current = null;

      // Camera permission.
      await Camera.requestCameraPermissionsAsync();

      // Wait for tfjs to initialize the backend.
      // console.log("tf");
      await tf.ready();
      // await tf.setBackend("cpu");
      // console.log("tf end");

      const model = await mobilenet.load();
      setModel(model);

      // Ready!
      setTfReady(true);
      console.log("Prepare done");
    }
    prepare();
  }, []);

  useEffect(() => {
    // Called when the app is unmounted.
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        rafId.current = 0;
      }
    };
  }, []);

  useEffect(() => {
    const framesPerSecond = Math.max(4, fps);
    const zeros = (5 * unitTime) / (1000 / framesPerSecond);
    if (
      startedScanning &&
      receivedData.length > zeros &&
      !receivedData.slice(receivedData.length - zeros).find((n) => n[0] != 0)
    ) {
      setDone(true);
      setMessage(decodeBinToMessage(decodeToBin(receivedData)));
    }
  }, [receivedData]);


  const handleCameraStream = async (images, updatePreview, gl) => {
    const loop = async () => {
      if(done || rafId.current === 0){
        return
      }
      // Get the tensor and run pose detection.
      const imageTensor = images.next().value;

      if(!imageTensor){
        return
      }
      const startTs = Date.now();
      const prediction = await model.classify(imageTensor);
      const item = prediction.find((item)=> item["className"]== "spotlight, spot")
      if(item){
        if(!startedScanning){
          setStartedScanning(true)
        }
        setReceivedData(old=> old.concat([[1, Date.now(), item["probability"]]]))
        setSpot(1)
        console.log(1, item["probability"])
      }else{
        setReceivedData(old=> old.concat([[0, Date.now()]]))
        setSpot(0)
        console.log(0)
      }

      const latency = Date.now() - startTs;
      setFps(Math.floor(1000 / latency));
      tf.dispose([imageTensor]);

      rafId.current = requestAnimationFrame(loop);
    };

    loop();
  };

  const renderFps = () => {
    return (
      <View style={styles.fpsContainer}>
        <Text>FPS: {fps}</Text>
      </View>
    );
  };

  const renderBulb   = () => {
    return (
      <View style={{...styles.bulbContainer, backgroundColor: spot ? "#ffffff" : "#000000"}}>
      </View>
    );
  };

  const renderCameraTypeSwitcher = () => {
    return (
      <View
        style={styles.cameraTypeSwitcher}
        onTouchEnd={handleSwitchCameraType}
      >
        <Text>
          Switch Camera
        </Text>
      </View>
    );
  };

  const handleSwitchCameraType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const reMount = ()=>{
    setStartedScanning(false)
    setReceivedData([])
    setSpot(0)
    setDone(false)
  }

  if (!tfReady) {
    return (
      <View style={styles.loadingMsg}>
        <Text>Loading...</Text>
      </View>
    );
  } else if (done) {
    return <ShowMessage message={message} reMount={reMount} onBack={onBack} />;
  }else {
    return (
      <View style={styles.containerPortrait}>
        <TensorCamera
          ref={cameraRef}
          style={styles.camera}
          autorender={true}
          type={cameraType}
          // tensor related props
          resizeWidth={OUTPUT_TENSOR_WIDTH}
          resizeHeight={OUTPUT_TENSOR_HEIGHT}
          resizeDepth={3}
          onReady={handleCameraStream}
        />
        {renderFps()}
        {renderBulb()}
        {renderCameraTypeSwitcher()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPortrait: {
    position: "relative",
    width: CAM_PREVIEW_WIDTH,
    height: CAM_PREVIEW_HEIGHT,
    marginTop: Dimensions.get("window").height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },
  containerLandscape: {
    position: "relative",
    width: CAM_PREVIEW_HEIGHT,
    height: CAM_PREVIEW_WIDTH,
    marginLeft: Dimensions.get("window").height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },
  loadingMsg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  svg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 30,
  },
  fpsContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 80,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
  bulbContainer: {
    position: "absolute",
    top: -70,
    right: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    borderRadius: 50,
    padding: 8,
    zIndex: 20,
    borderWidth: 5,
    borderColor: "#dbd4c6"
  },
  cameraTypeSwitcher: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 180,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
});
