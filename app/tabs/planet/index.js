import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Link } from "expo-router";

export default function Planet() {
  return (
    <View style={styles.container}>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    color: "red",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
