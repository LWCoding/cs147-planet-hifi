import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import db, { fetchFriends } from "@/database/db";
import { fetchAllPlanets } from "@/database/db";
import FriendComponent from "@/components/FriendComponent";

export default function AddFriends() {
  const router = useRouter();
  const { galaxyName } = useLocalSearchParams();
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

      // Find logged-in user's planet
      // setMainPlanet(allPlanets.find((user) => user.user_id === userId));

      // Set other planets for friends
      let array = [];
      for (let i = 0; i < friendIds.length; i++) {
        const friendId = friendIds[i];
        const friendPlanet = allPlanets.find(
          (planet) => planet.user_id === friendId
        );
        // console.log(friendPlanet);
        if (friendPlanet) {
          array.push(friendPlanet);
        }
      }
      console.log("array:", array);
      setFriendPlanets(array);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log("hi");
      await fetchFriendIds(); // Fetch friend IDs first
      fetchPlanets(); // Then fetch planets based on friend IDs
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{galaxyName ? galaxyName : "Loading..."}</Text>
      <FlatList
        data={friendPlanets}
        renderItem={({ item }) => (
          <FriendComponent
            userId={item.user_id}
            username={item.username}
            firstname={item.first_name}
            lastname={item.last_name}
          />
        )}
      ></FlatList>
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
    fontSize: 30,
  },
});
