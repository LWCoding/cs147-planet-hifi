import { useState, useEffect, useContext } from "react";
import {
<<<<<<< Updated upstream
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ImageBackground,
=======
	StyleSheet,
	View,
	ImageBackground,
	TouchableOpacity,
>>>>>>> Stashed changes
} from "react-native";
import { fetchUserGalaxiesById, findGalaxyById } from "@/database/db";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { UserContext } from "@/contexts/UserContext";
import { Button, Text, useTheme } from "react-native-paper";
import spaceBackgroundImage from "@/assets/space-bg.jpg";
<<<<<<< Updated upstream
import {
  fetchAllPlanets,
  fetchFriendsForUserId,
  fetchUsersGalaxies,
} from "@/database/db";
import { fetchFriends } from "@/database/db";
import { findPlanetById } from "@/database/db";
=======

// Import components
import ScopedGalaxy from "@/components/ScopedGalaxy";
>>>>>>> Stashed changes
import IconButton from "@/components/IconButton";

export default function Galaxy() {
<<<<<<< Updated upstream
  const [otherPlanets, setOtherPlanets] = useState(null);
  const [mainPlanet, setMainPlanet] = useState(null);
  const { userId } = useContext(UserContext);

  const theme = useTheme();
  const router = useRouter();

  const fetchPlanets = async () => {
    // Set logged-in user's planet
    const userPlanet = await findPlanetById(userId);
    setMainPlanet(userPlanet);

    // Set logged-in user's friends' planets
    const friendsPlanets = await fetchFriendsForUserId(userId);
    setOtherPlanets(friendsPlanets);
  };
  // NOTE TO LUCAS: ok so the logic was to get the first galaxy only bc we dont need to fetch them all yet
  // bc of loading ? and so it pushes to the galaxyname screen
  // const navtoNextGalaxy = async () => {
  //   const firstGal = await fetchFirstGalaxy(userId);
  //   const galaxyName = firstGal.name;
  //   console.log(galaxyName);
  //   router.push(`/tabs/galaxy/${galaxyName}`);
  // };

  // Get all planets from the database
  useEffect(() => {
    fetchPlanets();
  }, []);

  // useEffect(() => {
  //   fetchGalaxies();
  // }, [otherPlanets]);

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
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity style={styles.nextButton}>
            <Icon name="arrow-right" size={24} color="white" />
          </TouchableOpacity>
        </View>

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
=======
	const theme = useTheme();

	const [galaxyName, setGalaxyName] = useState("");
	const [galaxyId, setGalaxyId] = useState(null);
	const [galaxyIdx, setGalaxyIdx] = useState(0);
	const [allUserGalaxyIds, setAllUserGalaxyIds] = useState(null);
	const { userId } = useContext(UserContext);

	const fetchGalaxies = async () => {
		const galaxies = await fetchUserGalaxiesById(userId);
		setAllUserGalaxyIds(galaxies);

		const id = galaxies[galaxyIdx].galaxy_id;

		setGalaxyId(id); // Get the `i`th galaxy and set it
		const galaxyInfo = await findGalaxyById(id);

		setGalaxyName(galaxyInfo.name);
	};

	// Adds an `amt` to the galaxy index. Use `1` to go forward one index,
	// and `-1` to go back one index.
	const addToGalaxyIdx = async (amt) => {
		setGalaxyIdx((galaxyIdx + amt) % allUserGalaxyIds.length);
	};

	useEffect(() => {
		fetchGalaxies();
	}, [galaxyIdx]);

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
		>
			<ImageBackground
				source={spaceBackgroundImage}
				resizeMode="cover"
				style={styles.bgImage}
			>
				<View marginTop={30} style={styles.buttonsAndTitle}>
					<TouchableOpacity onPress={() => addToGalaxyIdx(-1)}>
						<MaterialCommunityIcon
							name="arrow-left"
							size={36}
							color={theme.colors.interactable}
						/>
					</TouchableOpacity>
					<Text style={styles.galaxyTitle} variant="displaySmall">
						{galaxyName}
					</Text>
					<TouchableOpacity onPress={() => addToGalaxyIdx(1)}>
						<MaterialCommunityIcon
							name="arrow-right"
							size={36}
							color={theme.colors.interactable}
						/>
					</TouchableOpacity>
				</View>
				<View
					paddingHorizontal={50}
					marginTop={25}
					style={styles.topButtonRow}
				>
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
				<ScopedGalaxy galaxyId={galaxyId} />
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontFamily: "PPPierSans-Regular",
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
>>>>>>> Stashed changes
});
