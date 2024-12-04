import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { findPlanetById } from "@/database/db";

export default function statusHistory() {
  const { user: inputtedUserId } = useLocalSearchParams(); // Get the user's info from navigation

  const theme = useTheme();
  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    const user = await findPlanetById(inputtedUserId);

    setUser(user);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (!user) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" animating={true} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.text}>{user.first_name}'s Post History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    position: "relative",
  },
  imageLoadingIndicator: {
    position: "absolute",
    top: "50%", // Position loading indicator over picture
  },
  activityIndicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    margin: 30,
    fontFamily: "PPPierSans-Regular",
  },
  statusText: {
    color: "black",
    // fontWeight: "bold",
    fontFamily: "PPPierSans-Regular",
    fontSize: 15,
  },
  expandButton: {
    position: "absolute",
    right: 40,
    bottom: "32%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    margin: 15,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  circle: {
    width: 50, // Circle's diameter
    height: 50, // Circle's diameter
    borderRadius: 25, // Half of the width/height for a perfect circle
    justifyContent: "center", // Center the icon vertically
    alignItems: "center", // Center the icon horizontally
  },
  planetContainer: {
    padding: 30,
    justifyContent: "center",
    fontFamily: "PPPierSans-Regular",
    alignItems: "center",
    position: "absolute",
    top: "7%",
    zIndex: 1,
  },
  image: {
    width: "80%",
    height: "50%",
    marginTop: 30,
    borderRadius: 15,
  },
  statusContainer: {
    margin: 3,
    width: "80%",
    backgroundColor: "#CBCBE2",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
});
