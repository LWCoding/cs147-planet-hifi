import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";

export default function ProfileButton({ icon, text, to, params, disabled }) {
  const router = useRouter();
  const theme = useTheme();

  const handlePress = () => {
    if (params) {
      router.push({ pathname: `${to}`, params: params });
      return;
    }
    router.push(`${to}`);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          { opacity: disabled ? 0.5 : 1 },
          styles.button,
          { backgroundColor: theme.colors.primary },
        ]}
        disabled={disabled}
        onPress={handlePress}
      >
        <MaterialCommunityIcon
          name={icon}
          size={30}
          color={theme.colors.inverseSurface}
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  button: {
    width: 80,
    aspectRatio: "1/1",
    borderRadius: "10%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PPPierSans-Regular",
  },
  buttonIcon: {
    marginBottom: 2,
  },
  buttonText: {
    textAlign: "center",
    paddingHorizontal: 5,
    fontFamily: "PPPierSans-Regular",
  },
};
