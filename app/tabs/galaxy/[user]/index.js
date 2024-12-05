import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { findPlanetById, findStatusById } from "@/database/db";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconButton from "@/components/IconButton";

// Import images
import PlaceholderImage from "@/assets/placeholder.png";
import Planet from "@/components/Planet";
import { UserContext } from "@/contexts/UserContext";

export default function userDetails() {
  const { user: inputtedUserId } = useLocalSearchParams(); // Get the user's info from navigation
  const { userId } = useContext(UserContext); // The current user's info

  const navigation = useNavigation();
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [hasPhotoStatus, setHasPhotoStatus] = useState(false);
  const [isPhotoStatusLoaded, setIsPhotoStatusLoaded] = useState(false);

  const fetchUserInfo = async () => {
    const user = await findPlanetById(inputtedUserId);

    const status = user.current_status_id
      ? await findStatusById(user.current_status_id)
      : null;

    if (status?.image_url) {
      setHasPhotoStatus(true);
    }

    setIsUserProfile(user.user_id === userId);

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
          <Planet
            userId={inputtedUserId}
            width={150}
            height={150}
            isClickable={false}
            isNameVisible={false}
          />
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
          {isUserProfile && (
            <IconButton
              to={`tabs/status`}
              icon="emoticon-happy"
              text="Status"
            />
          )}
          <IconButton
            to={`tabs/galaxy/${inputtedUserId}/statusHistory`}
            icon="history"
            text="History"
          />
          <IconButton
            to={`tabs/galaxy/${inputtedUserId}/calendar`}
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
  if (user) {
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
    bottom: 220,
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
