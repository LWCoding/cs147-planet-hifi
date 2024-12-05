import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

import { useTheme } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

export default function PhotoStatus() {
  const theme = useTheme();
  const cameraRef = useRef(null);
  const router = useRouter();
  const [cameraPerms, requestCameraPerms] = useCameraPermissions();
  const [isSavingPicture, setIsSavingPicture] = useState(false);

  // If this is null, camera permissions are still loading
  if (!cameraPerms) {
    return <View />;
  }

  // If no camera permissions were granted, ask for permission
  if (!cameraPerms.granted) {
    return (
      <View
        alignItems="center"
        justifyContent="center"
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text margin={10} variant="labelLarge">
          Camera permissions are required to take a photo
        </Text>
        <Button onPress={requestCameraPerms}>Request Perms</Button>
      </View>
    );
  }

  const takePicture = async () => {
    console.log("Taking picture...");
    setIsSavingPicture(true);

    const pic = await cameraRef.current.takePictureAsync({ base64: true });
    const base64String = pic.base64;

    router.push({
      pathname: "tabs/status/photoStatus",
      params: { uri: "data:image/png;base64," + base64String },
    });

    setIsSavingPicture(false);
  };

  // Or else, load the camera background and the photo button
  return isSavingPicture ? (
    <View
      justifyContent="center"
      alignItems="center"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text variant="labelLarge" margin={10}>
        Saving your picture... This may take a moment!
      </Text>
      <ActivityIndicator size="large" animating={true} />
    </View>
  ) : (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.cameraWrapper}>
        <CameraView style={styles.camera} ref={cameraRef} facing="back">
          <TouchableOpacity
            onPress={takePicture}
            style={[
              styles.cameraButton,
              { backgroundColor: theme.colors.onBackground },
            ]}
          ></TouchableOpacity>
        </CameraView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: screenWidth,
    height: (screenWidth * 3) / 4,
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: "center", // Center camera feed vertically
    alignItems: "center", // Center camera feed horizontally
    overflow: "hidden", // Clip any overflow outside the container
  },
  cameraButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    top: "85%", // How far down the camera button is
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }], // Necessary to center camera button
  },
});
