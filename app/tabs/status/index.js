import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";

export default function Status() {
  const theme = useTheme();
  const router = useRouter();

  const handlePressCamera = () => {
    router.push("/tabs/status/takePhoto");
  };

  const handlePressText = () => {
    router.push("/tabs/status/textStatus");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handlePressCamera}
      >
        <MaterialCommunityIcons
          style={[styles.iconButton, { backgroundColor: theme.colors.primary }]}
          size={62}
          name="camera"
          color={theme.colors.inverseSurface}
        />
        <Text style={styles.iconButtonText} variant="displaySmall">
          Camera
        </Text>
        <Text style={styles.iconButtonText} variant="bodyMedium">
          Take a snapshot of your current environment and tag it with a caption
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePressText}>
        <MaterialCommunityIcons
          style={[styles.iconButton, { backgroundColor: theme.colors.primary }]}
          size={62}
          name="format-text"
          color={theme.colors.inverseSurface}
        />
        <Text style={styles.iconButtonText} variant="displaySmall">
          Text
        </Text>
        <Text style={styles.iconButtonText} variant="bodyMedium">
          Update your current mood through text, hassle-free and photo-free
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  iconButton: {
    borderRadius: 96,
    padding: 25,
    width: "100%",
  },
  iconButtonText: {
    textAlign: "center",
    paddingHorizontal: 36,
    marginVertical: 2,
    fontFamily: "PPPierSans-Regular",
    paddingTop: 10

  },
  iconContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
