import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { Text } from "react-native-paper";

// Import components
import Planet from "@/components/Planet";

// Import database access
import db from "@/database/db";

const { width, height } = Dimensions.get("window");
const centerX = width / 2; // Center X position
const centerY = height / 2 - 100; // Center Y position
const radius = 150; // Radius for circular layout
const itemSize = 150; // Diameter of items

export default function Galaxy() {
  const [planets, setPlanets] = useState([]);

  // Fetch all planets from the database and return them in the form
  // [{username: String, realname: String, emotion: String}]
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
        realname: user.last_name,
        emotion,
      };
    });

    setPlanets(usersInfo);
  };

  // Get all planets from the database
  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <View style={styles.container}>
      {/* Render center item */}
      {planets.length > 0 && (
        <View style={styles.centerItem}>
          <Planet username={planets[0].username} emotion={planets[0].emotion} />
        </View>
      )}

      {/* Render circular items */}
      {planets.slice(1).map((item, index) => {
        const angle = (index / Math.min(planets.length - 1, 8)) * (2 * Math.PI); // Angle for spacing planets evenly
        const x = centerX + radius * Math.cos(angle) - itemSize / 2; // X position
        const y = centerY + radius * Math.sin(angle) - itemSize / 2; // Y position

        return (
          <View key={item.username} style={[styles.item, { left: x, top: y }]}>
            <Planet username={item.username} emotion={item.emotion} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Allows absolute positioning for items
    backgroundColor: "#11172A",
  },
  centerItem: {
    position: "absolute",
    left: centerX - itemSize / 2, // center horizontally
    top: centerY - itemSize / 2, // center vertically
    width: itemSize,
    height: itemSize,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    position: "absolute", // how to get rid of cut off tho lol this might be a later problem? - kristine
    width: itemSize,
    height: itemSize,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    top: -20, // Shift text up closer to planet
  },
});
