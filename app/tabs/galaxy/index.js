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
} from "@/database/db";
import uuid from "react-native-uuid";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { UserContext } from "@/contexts/UserContext";
import { Button, Text, useTheme } from "react-native-paper";
import spaceBackgroundImage from "@/assets/space-bg.jpg";

// Import components
import ScopedGalaxy from "@/components/ScopedGalaxy";
import IconButton from "@/components/IconButton";

export default function Galaxy() {
	const theme = useTheme();

	const [galaxyName, setGalaxyName] = useState("Loading...");
	const [galaxyId, setGalaxyId] = useState(null);
	const [galaxyIdx, setGalaxyIdx] = useState(0);
	const [allUserGalaxyIds, setAllUserGalaxyIds] = useState(null);

	const { userId } = useContext(UserContext);

	const fetchGalaxies = async () => {
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

		const id = galaxies[galaxyIdx].galaxy_id;

		setAllUserGalaxyIds(galaxies);
		setGalaxyId(id); // Get the `i`th galaxy and set it
		const galaxyInfo = await findGalaxyById(id);

		setGalaxyName(galaxyInfo.name);
	};

	// Adds an `amt` to the galaxy index. Use `1` to go forward one index,
	// and `-1` to go back one index.
	const addToGalaxyIdx = (amt) => {
		let calculatedIdx = galaxyIdx + amt;
		if (calculatedIdx < 0) {
			setGalaxyIdx(allUserGalaxyIds.length - 1);
		} else {
			setGalaxyIdx((galaxyIdx + amt) % allUserGalaxyIds.length);
		}
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
});
