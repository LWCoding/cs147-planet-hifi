import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Calendar() {
  const { user: userId } = useLocalSearchParams(); // Get the user's info from navigation

  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text>Calendar information here (TODO)! User id: {userId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
});
