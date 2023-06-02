import { useEffect, useState } from "react";
import { Text } from "react-native";

import ReadingScreen1 from "./ReadingScreen1";
// import ReadingScreen2 from "./ReadingScreen2";
// import ReadingScreen3 from "./ReadingScreen3";

export default function ReadingScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();

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
    return <ReadingScreen1 />;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>;
  }
}
