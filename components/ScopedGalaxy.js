import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

import { ActivityIndicator, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserContext } from "@/contexts/UserContext";
import Planet from "@/components/Planet";
import { fetchFriendsForGalaxyId } from "@/database/db";
import { findPlanetById } from "@/database/db";
import { debounce } from "lodash";

const galaxyMarginTop = 90; // How far from top entire galaxy should be pushed down

const { width, height } = Dimensions.get("window");
const centerX = width / 2; // Center X position
const centerY = height / 2 - 100; // Center Y position
const radius = 130; // Radius for circular layout
const itemSize = 150; // Diameter of items

export default function ScopedGalaxy({ galaxyPlanets }) {
  const [user, setUser] = useState(null);

  const { userId } = useContext(UserContext);

  const theme = useTheme();

  const fetchPlanets = async () => {
    // Set logged-in user's planet
    const userPlanet = await findPlanetById(userId);
    setUser(userPlanet);
  };

  // Get all planets from the database
  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <View style={styles.container}>
      {/* center planet */}
      {user != null && (
        <View style={styles.centerItem}>
          <Planet planet={user} />
        </View>
      )}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton}>
          <Icon name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* planets around center */}
      {galaxyPlanets.map((item, index) => {
        const angle = (index / galaxyPlanets.length) * (2 * Math.PI); // Angle for spacing planets evenly
        const x = centerX + radius * Math.cos(angle) - itemSize / 2; // X position
        const y =
          centerY + radius * Math.sin(angle) - itemSize / 2 + galaxyMarginTop; // Y position

        return (
          <View key={item.user_id} style={[styles.item, { left: x, top: y }]}>
            <Planet planet={item} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  newGalaxy: {
    borderRadius: 30,
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PPPierSans-Regular",
  },
  topButtonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    fontFamily: "PPPierSans-Regular",
  },
  centerItem: {
    position: "absolute",
    left: centerX - itemSize / 2, // center horizontally
    top: centerY - itemSize / 2 + galaxyMarginTop, // center vertically
    width: itemSize,
    height: itemSize,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PPPierSans-Regular",
  },
  item: {
    position: "absolute", // how to get rid of cut off tho lol this might be a later problem? - kristine
    width: itemSize,
    height: itemSize,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PPPierSans-Regular",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, // half of width/height
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PPPierSans-Regular",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "PPPierSans-Regular",
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  nextButton: {
    backgroundColor: "#9393BA",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
});
