import { CameraView, useCameraPermissions } from "expo-camera";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { useTheme } from "react-native-paper";

export default function PhotoStatus() {
  const theme = useTheme();
  const [cameraPerms, requestCameraPerms] = useCameraPermissions();

  // If this is null, camera permissions are still loading
  if (!cameraPerms) {
    return <View />;
  }

  // If no camera permissions were granted, ask for permission
  if (!cameraPerms.granted) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text>Camera permissions are required to take a photo</Text>
        <Button onPress={requestCameraPerms}>Request Perms</Button>
      </View>
    );
  }

  // Or else, load the camera background and the photo button
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CameraView style={styles.camera} facing="back">
        <TouchableOpacity
          style={[
            styles.cameraButton,
            { backgroundColor: theme.colors.onBackground },
          ]}
        ></TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
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
