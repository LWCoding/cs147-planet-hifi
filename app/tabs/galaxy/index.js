import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { UserContext } from "@/contexts/UserContext";

// Import components
import Planet from "@/components/Planet";

// Import database access
import db, { fetchAllPlanets } from "@/database/db";

// NOTE FROM KRISTINE: might have to update the logic and not assume that first user is main user lol oops

const { width, height } = Dimensions.get("window");
const centerX = width / 2; // Center X position
const centerY = height / 2 - 100; // Center Y position
const radius = 150; // Radius for circular layout
const itemSize = 150; // Diameter of items

export default function Galaxy() {
  const [otherPlanets, setOtherPlanets] = useState([]);
  const [mainPlanet, setMainPlanet] = useState(null);
  const { userId } = useContext(UserContext);

  const router = useRouter();
  const theme = useTheme();

  // Fetch all planets from the database and return them in the form
  // [{username: String, realname: String, emotion: String}]
  const fetchPlanets = async () => {
    const allPlanets = await fetchAllPlanets();

    // Find logged-in user's planet
    setMainPlanet(allPlanets.find((user) => user.user_id === userId));
    // Set all other planets
    setOtherPlanets(allPlanets.filter((user) => user.user_id !== userId));
  };

  // Get all planets from the database
  useEffect(() => {
    fetchPlanets();
  }, []);

  const navToNewGalaxy = () => {
    router.push("/tabs/galaxy/newGalaxy");
  };

  const navToManage = () => {
    router.push("/tabs/galaxy/manageAll");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TouchableOpacity
        style={[
          styles.newGalaxy,
          { backgroundColor: theme.colors.interactable },
        ]}
        onPress={navToNewGalaxy}
      >
        <Text style={styles.buttonText}>New Galaxy</Text>
      </TouchableOpacity>
      {/* center planet */}
      {mainPlanet != null && (
        <View style={styles.centerItem}>
          <Planet userId={mainPlanet.user_id} />
        </View>
      )}

      {/* planets around center */}
      {otherPlanets.map((item, index) => {
        const angle = (index / otherPlanets.length) * (2 * Math.PI); // Angle for spacing planets evenly
        const x = centerX + radius * Math.cos(angle) - itemSize / 2; // X position
        const y = centerY + radius * Math.sin(angle) - itemSize / 2; // Y position

        return (
          <View key={item.username} style={[styles.item, { left: x, top: y }]}>
            <Planet userId={item.user_id} />
          </View>
        );
      })}
      {/* manage button */}
      <TouchableOpacity
        onPress={navToManage}
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.interactable },
        ]}
      >
        <Icon name="bars" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Allows absolute positioning for items
    fontFamily: "PPPierSans-Regular",
  },
  newGalaxy: {
    borderRadius: 30,
    position: "absolute",
    left: (width - 180) / 2,
    top: 30,
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PPPierSans-Regular",
  },
  centerItem: {
    position: "absolute",
    left: centerX - itemSize / 2, // center horizontally
    top: centerY - itemSize / 2, // center vertically
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
  itemText: {
    fontFamily: "PPPierSans-Regular",
    top: -20, // Shift text up closer to planet
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, // half of width/height
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 60,
    fontFamily: "PPPierSans-Regular",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "PPPierSans-Regular", // Add custom font
  },
});
