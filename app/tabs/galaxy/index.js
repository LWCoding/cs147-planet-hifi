import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList } from "react-native";
import { Button } from "react-native-paper";

// Import components
import Planet from "@/components/Planet";

// Import database access
import db from "@/database/db";

export default function Galaxy() {
  const [planets, setPlanets] = useState(null);

  // Fetch all planets from the database and return them in the form
  // [{username: String, emotion: String}]
  const fetchPlanets = async () => {
    const { data: usersData, error: usersError } = await db
      .from("users")
      .select("*");

    if (usersError) {
      console.error("Error fetching users: " + error.message);
    }

    const { data: statusData, error: statusError } = await db
      .from("statuses")
      .select("*");

    if (statusError) {
      console.error("Error fetching statuses: " + error.message);
    }

    const usersInfo = usersData.map((user) => {
      // If the user has a status, then find the status
      let emotion = "happy"; // Default emotion to happy
      if (user.current_status_id) {
        const status = statusData.find(
          (status) => status.user_id === user.user_id
        );
        emotion = status.emotion;
      }

      return {
        username: user.username,
        emotion,
      };
    });

    console.log(usersInfo);

    setPlanets(usersInfo);
  };

  // Get all planets from the database
  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <View style={styles.container}>
      {/* This is an example of how to use a React Native Paper element - Lucas */}
      <Button mode="contained" onPress={() => fetchPlanets()}>
        Press Me
      </Button>

      <FlatList
        style={styles.planetContainer}
        data={planets}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <Planet username={item.username} emotion={item.emotion} />
        )}
      />
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
  planetContainer: {
    width: "100%",
    height: "100%",
  },
});
