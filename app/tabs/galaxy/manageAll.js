import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import db, { fetchFriends } from "@/database/db";
import { fetchAllPlanets } from "@/database/db";
import RemoveFriendComponent from "@/components/RemoveFriendComponent";

// NOTE FROM KRISTINE: prob add logic so that if its the main galaxy,
// you're only able to remove friends

export default function RemoveFriends() {
  const router = useRouter();
  const { galaxyName: name } = useLocalSearchParams();
  const { userId } = useContext(UserContext);
  const [friendIds, setFriendIds] = useState([]);
  const [friendPlanets, setFriendPlanets] = useState([]);

  const fetchFriendIds = async () => {
    const friendsIds = await fetchFriends(userId);
    console.log("Fetched Friend IDs:", friendsIds);
    setFriendIds(friendsIds);
  };
  const fetchPlanets = async () => {
    try {
      const allPlanets = await fetchAllPlanets();
      console.log("All Planets:", allPlanets);

      let array = [];
      for (let i = 0; i < friendIds.length; i++) {
        const friendId = friendIds[i];
        const friendPlanet = allPlanets.find(
          (planet) => planet.user_id === friendId
        );
        if (friendPlanet) {
          array.push(friendPlanet);
        }
      }
      setFriendPlanets(array);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };

  useEffect(() => {
    fetchFriendIds();
  }, []);

  useEffect(() => {
    if (friendIds.length > 0) {
      fetchPlanets(); // fetch planets when friendIds is updated
    }
  }, [friendIds]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>Add friends to</Text>
        <Text style={styles.text}>{galaxyName}</Text>
      </View>
      <FlatList
        data={friendPlanets}
        renderItem={({ item }) => (
          <FriendComponent
            galaxyName={galaxyName}
            planetObj={item}
            // userId={item.user_id}
            // username={item.username}
            // firstname={item.first_name}
            // lastname={item.last_name}
          />
        )}
      ></FlatList>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          "Don't see your friend? Add them from Contacts or invite them to join
          Planet!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
  },
  text: {
    color: "white",
    fontSize: 35,
    fontFamily: "PPPierSans-Regular",
  },
  topText: {
    color: "white",
    fontSize: 18,
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
    color: "white",
    fontSize: 13,
    fontStyle: "italic",
  },
});
