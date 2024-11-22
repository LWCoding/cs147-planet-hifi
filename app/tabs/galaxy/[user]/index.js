import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import db from "@/database/db";
import PlanetImages from "@/assets/planet";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function userDetails() {
  const { user: username } = useLocalSearchParams(); // Get the user's info from navigation

  const navigation = useNavigation();
  const theme = useTheme();
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState([]);

  const getImageFromEmotion = (emotion) => {
    switch (emotion) {
      case "happy":
        return PlanetImages.faces.happy;
      case "sad":
        return PlanetImages.faces.sad;
      case "angry":
        return PlanetImages.faces.angry;
      case "neutral":
        return PlanetImages.faces.neutral;
      default:
        return PlanetImages.faces.happy; // Default to happy
    }
  };

  // Override the navigation bar information to show username
  // useEffect(() => {
  //   navigation.setOptions({
  //     title: "",
  //   });
  // }, []);

  const fetchUserInfo = async () => {
    try {
      const { data: userData, error: userError } = await db
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (userError) {
        console.error("Error fetching users: ", userError.message);
        return;
      }
      setUser(userData);
      const userCurrStatusId = userData.current_status_id;
      if (userCurrStatusId) {
        const { data: statusData, error: statusError } = await db
          .from("statuses")
          .select("*")
          .eq("status_id", userCurrStatusId)
          .single();

        setStatus(statusData);
        if (statusError) {
          console.error("Error fetching statuses: ", statusError.message);
          return;
        }
      } else {
        setStatus(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  const navtoImage = () => {
    navigation.navigate("image", { url: status.image_url });
  };

  let renderItem = null;

  if (user && status) {
    renderItem = (
      <>
        {<Image source={{ uri: status.image_url }} style={styles.image} />}
        <View style={styles.planetContainer}>
          <Image source={PlanetImages.base} style={styles.planet} />
          {user && status && (
            <Image
              style={styles.face}
              source={getImageFromEmotion(status.emotion)}
            />
          )}
        </View>
        <TouchableOpacity style={styles.expandButton} onPress={navtoImage}>
          <View style={styles.circle}>
            <Icon name="expand" size={30} color="white" />
          </View>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status.status_text}</Text>
        </View>
        <StatusBar style="auto" />
      </>
    );
  } else {
    renderItem = (
      <>
        <Text>No status available</Text>
      </>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.text}>{user.first_name}'s Planet</Text>
      {renderItem}
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
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    margin: 40,
  },
  statusText: {
    color: "black",
    // fontWeight: "bold",
    fontSize: 15,
  },
  face: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 30, // changed to 30 bc i put paddingtop
  },
  relativeOverText: {
    top: -10, // Shift closer to planet
  },
  planet: {
    width: 150,
    height: 150,
  },
  expandButton: {
    position: "absolute",
    right: 40,
    bottom: 200,
  },
  circle: {
    width: 50, // Circle's diameter
    height: 50, // Circle's diameter
    borderRadius: 25, // Half of the width/height for a perfect circle
    backgroundColor: "#575788", // Circle's background color
    justifyContent: "center", // Center the icon vertically
    alignItems: "center", // Center the icon horizontally
  },
  planetContainer: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "8%",
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
