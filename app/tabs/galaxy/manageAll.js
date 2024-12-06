import { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Alert,
} from "react-native";
import { Text, ActivityIndicator, Button, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import db, { fetchFriendsForUserId, findGalaxyById } from "@/database/db";

// Import components
import FriendComponent from "@/components/FriendComponent";

// Import assets
import spaceBackgroundImage from "@/assets/space-bg.jpg";

export default function ManageFriends() {
  const { galaxyId, galaxyName } = useLocalSearchParams();
  const { userId } = useContext(UserContext);

  const [friendPlanets, setFriendPlanets] = useState(null);
  const [addedFriendIds, setAddedFriendIds] = useState(null);

  const router = useRouter();
  const theme = useTheme();

  // Function is called when an "add friend" button is pressed
  const toggleFriendInGalaxy = (friendId) => {
    let tempFriendIds = addedFriendIds;

    // Either remove or add the friend
    if (tempFriendIds.includes(friendId)) {
      tempFriendIds = tempFriendIds.filter((id) => id !== friendId);
    } else {
      tempFriendIds = [...addedFriendIds, friendId];
    }

    setAddedFriendIds(tempFriendIds);

    // Return true if friend is now in database, else false
    return tempFriendIds.includes(friendId);
  };

  const fetchPlanets = async () => {
    try {
      const friendPlanets = await fetchFriendsForUserId(userId);
      setFriendPlanets(friendPlanets);

      const alreadyAddedFriends = await findGalaxyById(galaxyId);
      setAddedFriendIds(alreadyAddedFriends.planets);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };

  const submitGalaxy = async () => {
    try {
      // Creat
      const updatedGalaxyData = {
        name: galaxyName,
        planets: addedFriendIds,
      };

      // Update galaxy object in database
      const { error } = await db
        .from("galaxies")
        .update(updatedGalaxyData)
        .eq("galaxy_id", galaxyId);

      if (error) {
        Alert.alert("Error updating galaxy: ", error);
        console.error("Error updating galaxy:", error);
        return;
      }

      Alert.alert("Galaxy updated successfully!");

      router.dismissTo("tabs/galaxy"); // Go back to main screen
    } catch (error) {
      console.error("Error updating galaxy:", error);
    }
  };

  const deleteGalaxy = async () => {
    // Delete the galaxy
    try {
      const { error } = await db
        .from("galaxies")
        .delete()
        .eq("galaxy_id", galaxyId);

      if (error) {
        Alert.alert("Error deleting galaxy: ", error);
        console.error("Error deleting galaxy:", error);
        return;
      }

      Alert.alert("Galaxy deleted successfully!");

      router.dismissTo("tabs/galaxy"); // Go back to main screen
    } catch (error) {
      console.error("Error deleting galaxy:", error);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <ImageBackground
      source={spaceBackgroundImage}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text variant="titleMedium" style={styles.topText}>
            Manage friends in
          </Text>
          <Text variant="displaySmall" style={styles.text}>
            {galaxyName}
          </Text>
        </View>
        {!friendPlanets && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            animating={true}
          />
        )}
        <FlatList
          data={friendPlanets}
          renderItem={({ item }) => (
            <FriendComponent
              galaxyName={galaxyName}
              planetObj={item}
              toggleFriendInGalaxy={toggleFriendInGalaxy}
              isToggled={addedFriendIds?.includes(item.user_id)}
            />
          )}
        ></FlatList>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonRow} marginVertical={10}>
            <Button
              buttonColor={theme.colors.interactable}
              mode="contained"
              onPress={submitGalaxy}
            >
              Save
            </Button>
            <Button
              buttonColor={theme.colors.error}
              textColor={theme.colors.errorContainer}
              mode="contained"
              onPress={deleteGalaxy}
            >
              Delete Galaxy
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "PPPierSans-Regular",
  },
  topText: {
    fontFamily: "PPPierSans-Regular",
  },
  bottomContainer: {
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonRow: {
    flexDirection: "row",
  },
  topContainer: {
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  bottomText: {
    fontStyle: "italic",
    textAlign: "center",
  },
});
