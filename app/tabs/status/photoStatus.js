import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { useTheme } from "react-native-paper";

export default function PhotoStatus() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text>Photo!!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
