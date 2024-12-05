import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
// NOTE FROM KRISTINE: HOW TO AVOID DUPLICATE OF PLANET NAMES LOL?

import { ActivityIndicator, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import Planet from "@/components/Planet";
import spaceBackgroundImage from "@/assets/space-bg.jpg";
import { fetchAllPlanets } from "@/database/db";
import { fetchFriends } from "@/database/db";
import { findPlanetById } from "@/database/db";
import IconButton from "@/components/IconButton";

const galaxyMarginTop = 50; // How far from top entire galaxy should be pushed down

const { width, height } = Dimensions.get("window");
const centerX = width / 2; // Center X position
const centerY = height / 2 - 100; // Center Y position
const radius = 140; // Radius for circular layout
const itemSize = 150; // Diameter of items

export default function Galaxy() {
  const [otherPlanets, setOtherPlanets] = useState([]);
  const [mainPlanet, setMainPlanet] = useState(null);
  const { userId } = useContext(UserContext);

  const theme = useTheme();

  // Fetch all planets from the database and return them in the form
  // [{username: String, realname: String, emotion: String}]
  const fetchPlanets = async () => {
    const allPlanets = await fetchAllPlanets();
    const friendIds = await fetchFriends(userId);

    console.log(friendIds);
    // Find logged-in user's planet
    setMainPlanet(allPlanets.find((user) => user.user_id === userId));

    // find friends' planets
    let friendsPlanets = [];
    for (let i = 0; i < friendIds.length; i++) {
      const friendPlanet = await findPlanetById(friendIds[i]);
      friendsPlanets.push(friendPlanet);
    }
    setOtherPlanets(friendsPlanets);
    // PREVIOUS, RENDER ALL USERS: setOtherPlanets(allPlanets.filter((user) => user.user_id !== userId));
  };

  // Get all planets from the database
  useEffect(() => {
    fetchPlanets();
  }, []);

  if (!mainPlanet || !otherPlanets) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" animating={true} />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImageBackground
        source={spaceBackgroundImage}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View paddingHorizontal={50} top={30} style={styles.topButtonRow}>
          <IconButton
            to="/tabs/galaxy/newGalaxy"
            icon="plus-circle"
            text="New Galaxy"
          />
          <IconButton
            to="/tabs/galaxy/manageAll"
            icon="menu"
            text="Manage Galaxy"
          />
        </View>
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
          const y =
            centerY + radius * Math.sin(angle) - itemSize / 2 + galaxyMarginTop; // Y position

          return (
            <View
              key={item.username}
              style={[styles.item, { left: x, top: y }]}
            >
              <Planet userId={item.user_id} />
            </View>
          );
        })}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    fontFamily: "PPPierSans-Regular",
  },
  newGalaxy: {
    borderRadius: 30,
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PPPierSans-Regular",
  },
  bgImage: {
    flex: 1,
    height: "120%",
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
});
