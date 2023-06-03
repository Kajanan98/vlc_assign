// // import classifyImage from "../../utils/vlc/classifyImage";
// import React, { useEffect, useRef } from "react";
// import { View } from "react-native";
// import { Camera } from "expo-camera";

// export default function ReadingScreen2() {
//   const cameraRef = useRef(null);

//   const wait = async (unitTime) => {
//     await new Promise((resolve) => setTimeout(resolve, unitTime));
//     // Code to execute after waiting for 100 milliseconds
//     console.log(`Waited for ${unitTime}ms`);
//   };

//   const processFrame = async () => {
//     const frame = await cameraRef.current.takePictureAsync({ base64: true });
//     // const imgClass = classifyImage(frame);
//     // console.log(imgClass);
//   };

//   const runProcessing = async () => {
//     while (true) {
//       await processFrame();
//     }
//   };

//   useEffect(() => {
//     runProcessing();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       <Camera
//         style={{ flex: 1 }}
//         type={Camera.Constants.Type.back}
//         ref={cameraRef}
//       />
//     </View>
//   );
// }
