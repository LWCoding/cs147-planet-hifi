import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Text } from "react-native-paper";

import { useTheme } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

export default function PhotoStatus() {
  const theme = useTheme();
  const { uri, width, height } = useLocalSearchParams();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Image
        style={{ width: screenWidth, height: (screenWidth * 3) / 4 }}
        source={{ uri: uri }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
