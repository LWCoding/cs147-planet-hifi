import { useState, useEffect } from "react";
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
// import { useNavigation } from "expo-router";

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

  const router = useRouter();
  const theme = useTheme();
  // const navigation = useNavigation();

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
        realname: user.first_name,
        emotion,
      };
    });

    setPlanets(usersInfo);
  };

  // Get all planets from the database
  useEffect(() => {
    fetchPlanets();
  }, []);

  const handlePress = () => {
    console.log("hi");
  };

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
      <TouchableOpacity style={styles.newGalaxy} onPress={navToNewGalaxy}>
        <Text style={styles.buttonText}>New Galaxy</Text>
      </TouchableOpacity>
      {/* center planet */}
      {planets.length > 0 && (
        <View style={styles.centerItem}>
          <Planet
            username={planets[0].username}
            realname={planets[0].realname}
            emotion={planets[0].emotion}
          />
        </View>
      )}

      {/* planets around center */}
      {planets.slice(1).map((item, index) => {
        const angle = (index / Math.min(planets.length - 1, 8)) * (2 * Math.PI); // Angle for spacing planets evenly
        const x = centerX + radius * Math.cos(angle) - itemSize / 2; // X position
        const y = centerY + radius * Math.sin(angle) - itemSize / 2; // Y position

        return (
          <View key={item.username} style={[styles.item, { left: x, top: y }]}>
            <Planet
              username={item.username}
              realname={item.realname}
              emotion={item.emotion}
            />
          </View>
        );
      })}
      {/* manage button */}
      <TouchableOpacity onPress={navToManage} style={styles.iconContainer}>
        <Icon name="bars" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Allows absolute positioning for items
  },
  newGalaxy: {
    backgroundColor: "#9393BA",
    borderRadius: 30,
    position: "absolute",
    left: (width - 180) / 2,
    top: 30,
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
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
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, // half of width/height
    backgroundColor: "#9393BA",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 60,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
