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
import db, { fetchFriendsForUserId } from "@/database/db";

// Import components
import FriendComponent from "@/components/FriendComponent";

// Import assets
import spaceBackgroundImage from "@/assets/space-bg.jpg";

export default function AddFriends() {
  const { galaxyName } = useLocalSearchParams();
  const { userId } = useContext(UserContext);
  const [friendPlanets, setFriendPlanets] = useState(null);
  const [addedFriendIds, setAddedFriendIds] = useState([]);

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
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };

  const submitGalaxy = async () => {
    try {
      // Insert galaxy object into database
      const galaxyData = {
        name: galaxyName,
        creator_userid: userId,
        planets: addedFriendIds,
      };

      // Insert galaxy object into database
      const { error } = await db.from("galaxies").insert(galaxyData);

      if (error) {
        Alert.alert("Error inserting galaxy: ", error);
        console.error("Error inserting galaxy:", error);
        return;
      }

      Alert.alert("Galaxy created successfully!");

      router.dismissTo("tabs/galaxy"); // Go back to main screen
    } catch (error) {
      console.error("Error submitting galaxy:", error);
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
            Add friends to
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
          <View marginVertical={10}>
            <Button
              buttonColor={theme.colors.interactable}
              mode="contained"
              onPress={submitGalaxy}
            >
              Create Galaxy with Friends ({addedFriendIds.length})
            </Button>
          </View>
          <Text style={styles.bottomText}>
            Don't see your friend? Add them from Contacts or invite them to join
            Planet!
          </Text>
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
