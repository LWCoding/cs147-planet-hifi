import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, FlatList, ImageBackground } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import {
	fetchAllPlanets,
	fetchFriendsForUserId,
	findPlanetById,
} from "@/database/db";

// Import components
import FriendComponent from "@/components/FriendComponent";

// Import assets
import spaceBackgroundImage from "@/assets/space-bg.jpg";

export default function AddFriends() {
	const { galaxyName } = useLocalSearchParams();
	const { userId } = useContext(UserContext);
	const [friendPlanets, setFriendPlanets] = useState([]);

	const fetchPlanets = async () => {
		try {
			const friendPlanets = await fetchFriendsForUserId(userId);
			setFriendPlanets(friendPlanets);
		} catch (error) {
			console.error("Error fetching planets:", error);
		}
	};

	useEffect(() => {
		fetchPlanets();
	}, []);

	return (
		<ImageBackground
			source={spaceBackgroundImage}
			resizeMode="cover"
			style={styles.bgImage}
		>
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<Text variant="titleMedium" style={styles.topText}>
						Add friends to
					</Text>
					<Text variant="displaySmall" style={styles.text}>
						{galaxyName}
					</Text>
				</View>
				{friendPlanets.length === 0 && (
					<ActivityIndicator
						style={styles.activityIndicator}
						size="large"
						animating={true}
					/>
				)}
				<FlatList
					data={friendPlanets}
					renderItem={({ item }) => (
						<FriendComponent
							galaxyName={galaxyName}
							planetObj={item}
						/>
					)}
				></FlatList>
				<View style={styles.bottomContainer}>
					<Text style={styles.bottomText}>
						Don't see your friend? Add them from Contacts or invite
						them to join Planet!
					</Text>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bgImage: {
		flex: 1,
	},
	activityIndicator: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontFamily: "PPPierSans-Regular",
	},
	topText: {
		fontFamily: "PPPierSans-Regular",
	},
	bottomContainer: {
		padding: 10,
		marginLeft: 20,
		marginRight: 20,
	},
	topContainer: {
		marginTop: 10,
		padding: 10,
		alignItems: "center",
	},
	bottomText: {
		fontStyle: "italic",
		textAlign: "center",
	},
});
