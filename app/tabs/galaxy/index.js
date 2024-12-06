import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import db, {
  fetchFriendsForUserId,
  fetchUserGalaxiesById,
  findGalaxyById,
  findPlanetById,
} from "@/database/db";
import uuid from "react-native-uuid";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { UserContext } from "@/contexts/UserContext";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import spaceBackgroundImage from "@/assets/space-bg.jpg";

// Import components
import ScopedGalaxy from "@/components/ScopedGalaxy";
import IconButton from "@/components/IconButton";

export default function Galaxy() {
  const theme = useTheme();

  const [galaxyName, setGalaxyName] = useState("Loading...");
  const [galaxyIdx, setGalaxyIdx] = useState(0);
  const [galaxyCount, setGalaxyCount] = useState(1);
  const [allGalaxyPlanets, setAllGalaxyPlanets] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useContext(UserContext);

  const getCurrentGalaxy = () => {
    if (!allGalaxyPlanets) {
      return null;
    }
    return allGalaxyPlanets[galaxyIdx];
  };

  const fetchGalaxies = async () => {
    setIsLoading(true);

    let galaxies = await fetchUserGalaxiesById(userId);

    // If there are no galaxies (first time load), create "All Friends" galaxy
    if (galaxies.length == 0) {
      let allFriends = await fetchFriendsForUserId(userId);

      let validFriends = allFriends.filter((friend) => friend != null);
      let allFriendIds = validFriends.map((friend) => friend.user_id);

      const newUuid = uuid.v4();
      const galaxyData = {
        name: "All Friends",
        creator_userid: userId,
        planets: allFriendIds,
        galaxy_id: newUuid,
      };

      galaxies = [galaxyData];

      await db.from("galaxies").insert(galaxyData); // Add to database
    }

    let galaxyPlanets = [];

    setGalaxyCount(galaxies.length);

    for (let i = 0; i < galaxies.length; i++) {
      const id = galaxies[i]["galaxy_id"];
      const galaxyInfo = await findGalaxyById(id);
      const planetIds = galaxyInfo.planets;
      let planets = [];

      for (let j = 0; j < planetIds.length; j++) {
        const planet = await findPlanetById(planetIds[j]);
        planets.push(planet);
      }

      galaxyPlanets.push({
        galaxyName: galaxyInfo.name,
        galaxyId: galaxyInfo.galaxy_id,
        planets,
      });
    }

    setAllGalaxyPlanets(galaxyPlanets);

    setIsLoading(false);
  };

  // Adds an `amt` to the galaxy index. Use `1` to go forward one index,
  // and `-1` to go back one index.
  const updateGalaxyIdx = (amt) => {
    let calculatedIdx = galaxyIdx + amt;
    if (calculatedIdx < 0) {
      setGalaxyIdx(galaxyCount - 1);
    } else {
      setGalaxyIdx((galaxyIdx + amt) % galaxyCount);
    }
  };

  useEffect(() => {
    db.channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          table: "galaxies",
        },
        (payload) => {
          fetchGalaxies();
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    fetchGalaxies();
    setGalaxyIdx(0);
  }, []);

  useEffect(() => {
    if (allGalaxyPlanets != null) {
      setGalaxyName(getCurrentGalaxy().galaxyName);
    }
  }, [allGalaxyPlanets, galaxyIdx]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImageBackground
        source={spaceBackgroundImage}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View marginTop={30} style={styles.buttonsAndTitle}>
          <TouchableOpacity
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.4 : 1 }}
            onPress={() => updateGalaxyIdx(-1)}
          >
            <MaterialCommunityIcon
              name="arrow-left"
              size={36}
              color={theme.colors.interactable}
            />
          </TouchableOpacity>
          <Text style={styles.galaxyTitle} variant="displaySmall">
            {galaxyName}
          </Text>
          <TouchableOpacity
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.4 : 1 }}
            onPress={() => updateGalaxyIdx(1)}
          >
            <MaterialCommunityIcon
              name="arrow-right"
              size={36}
              color={theme.colors.interactable}
            />
          </TouchableOpacity>
        </View>
        <View paddingHorizontal={50} marginTop={25} style={styles.topButtonRow}>
          <IconButton
            to="/tabs/galaxy/newGalaxy"
            icon="plus-circle"
            text="New Galaxy"
            disabled={isLoading}
          />
          <IconButton
            to="/tabs/galaxy/manageAll"
            icon="menu"
            text="Manage Galaxy"
            disabled={isLoading}
            params={{
              galaxyId: getCurrentGalaxy()?.galaxyId,
              galaxyName: galaxyName,
            }}
          />
        </View>
        {isLoading ? (
          <View style={[styles.loadingContainer]}>
            <ActivityIndicator size="large" animating={true} />
          </View>
        ) : (
          <ScopedGalaxy galaxyPlanets={getCurrentGalaxy()?.planets} />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "PPPierSans-Regular",
  },
  loadingContainer: {
    flex: 1,
  },
  buttonsAndTitle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  galaxyTitle: {
    textAlign: "center",
    fontWeight: "bold",
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
});
