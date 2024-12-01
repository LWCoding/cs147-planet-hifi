import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";

export default function ProfileButton({ icon, text, to }) {
  const router = useRouter();
  const theme = useTheme();

  const handlePress = () => {
    router.push(`${to}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handlePress}
      >
        <MaterialCommunityIcon
          name={icon}
          size={30}
          color={theme.colors.inverseSurface}
          style={styles.buttonIcon}
        />
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 80,
    aspectRatio: "1/1",
    borderRadius: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    marginBottom: 2,
  },
};
