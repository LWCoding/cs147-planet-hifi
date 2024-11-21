import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Planet() {
  const { user: username } = useLocalSearchParams(); // Get the user's info from navigation

  const navigation = useNavigation();

  // Override the navigation bar information to show username
  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="displaySmall">{username}</Text>
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
