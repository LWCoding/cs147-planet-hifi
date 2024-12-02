import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { findPlanetById, findStatusById } from "@/database/db";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconButton from "@/components/IconButton";

// Import images
import PlanetImages from "@/assets/planet";
import PlaceholderImage from "@/assets/placeholder.png";

export default function userDetails() {
  const { user: userId } = useLocalSearchParams(); // Get the user's info from navigation

  const navigation = useNavigation();
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [hasPhotoStatus, setHasPhotoStatus] = useState(false);
  const [isPhotoStatusLoaded, setIsPhotoStatusLoaded] = useState(false);

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

  const fetchUserInfo = async () => {
    const user = await findPlanetById(userId);

    const status = user.current_status_id
      ? await findStatusById(user.current_status_id)
      : null;

    if (status?.image_url) {
      setHasPhotoStatus(true);
    }

    setUser(user);
    setStatus(status);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const navtoImage = () => {
    navigation.navigate("image", { url: status.image_url });
  };

  let renderItem = null;

  if (user && status) {
    renderItem = (
      <>
        <ActivityIndicator
          color={theme.colors.primary}
          style={[
            styles.imageLoadingIndicator,
            { display: !isPhotoStatusLoaded ? "flex" : "none" },
          ]}
          size="small"
        />
        {status?.image_url ? (
          <Image
            source={{ uri: status.image_url }}
            style={[styles.image]}
            onLoadEnd={() => setIsPhotoStatusLoaded(true)}
          />
        ) : (
          <Image source={PlaceholderImage} style={styles.image} />
        )}
        <View style={styles.planetContainer}>
          <Image source={PlanetImages.base} style={styles.planet} />
          {user && status && (
            <Image
              style={styles.face}
              source={getImageFromEmotion(status.emotion)}
            />
          )}
        </View>
        {hasPhotoStatus && isPhotoStatusLoaded && (
          <TouchableOpacity style={styles.expandButton} onPress={navtoImage}>
            <View
              style={[
                styles.circle,
                { backgroundColor: theme.colors.interactable },
              ]}
            >
              <Icon name="expand" size={30} color="white" />
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status.status_text}</Text>
        </View>
        <View style={styles.buttonRow}>
          <IconButton to={`tabs/status`} icon="emoticon-happy" text="Status" />
          <IconButton
            to={`tabs/galaxy/${userId}/calendar`}
            icon="calendar-account"
            text="Calendar"
          />
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

  // If we have the user's info, display it -- or else show a loading icon
  if (user != null) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={styles.text}>{user.first_name}'s Planet</Text>
        {renderItem}
      </View>
    );
  } else {
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
