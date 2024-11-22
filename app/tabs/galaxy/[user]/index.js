import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useTheme } from "react-native-paper";

export default function Planet() {
  const { user: username } = useLocalSearchParams(); // Get the user's info from navigation

  const navigation = useNavigation();
  const theme = useTheme();

  // Override the navigation bar information to show username
  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, []);

  /*
    TODO: Find the user from the database based on the username, and set information
    in here to be relevant information
  */

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
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
    fontFamily: "PPPierSans-Regular"

  },
  logout: {
    color: "red",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
