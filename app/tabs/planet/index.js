import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Link } from "expo-router";
import { useTheme } from "react-native-paper";

export default function Planet() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text variant="displaySmall">Planet personal information screen</Text>
      <Link href="/">
        <Text style={styles.logout}>Logout</Text>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
  logout: {
    color: "red",
    textDecorationLine: "underline",
    marginTop: 20,
    fontFamily: "PPPierSans-Regular"
  },
});
