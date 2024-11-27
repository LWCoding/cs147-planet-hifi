import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Button, Text } from "react-native-paper";

import { useTheme } from "react-native-paper";

export default function PhotoStatus() {
  const theme = useTheme();
  const cameraRef = useRef(null);
  const [picUri, setPicUri] = useState("");
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

  const takePicture = async () => {
    console.log("Taking picture...");
    const pic = await cameraRef.current.takePictureAsync();
    console.log(pic.uri); // Saves the URI of the picture
    setPicUri(pic.uri);
  };

  // Or else, load the camera background and the photo button
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CameraView style={styles.camera} ref={cameraRef} facing="back">
        <TouchableOpacity
          onPress={takePicture}
          style={[
            styles.cameraButton,
            { backgroundColor: theme.colors.onBackground },
          ]}
        ></TouchableOpacity>
        <Image // This is a placeholder for now! We should open on a separate screen
          style={{
            position: "absolute",
            right: 20,
            bottom: 50,
            width: 100,
            height: 100,
          }}
          source={{ uri: picUri }}
        ></Image>
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
