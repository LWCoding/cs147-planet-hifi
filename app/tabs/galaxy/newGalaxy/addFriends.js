import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, FlatList, ImageBackground } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import { fetchFriends, fetchAllPlanets } from "@/database/db";

// Import components
import FriendComponent from "@/components/FriendComponent";

// Import assets
import spaceBackgroundImage from "@/assets/space-bg.jpg";

export default function AddFriends() {
	const { galaxyName } = useLocalSearchParams();
	const { userId } = useContext(UserContext);
	const [friendIds, setFriendIds] = useState([]);
	const [friendPlanets, setFriendPlanets] = useState([]);

	const fetchFriendIds = async () => {
		const friendsIds = await fetchFriends(userId);
		setFriendIds(friendsIds);
	};

	const fetchPlanets = async () => {
		try {
			const allPlanets = await fetchAllPlanets();

			let array = [];
			for (let i = 0; i < friendIds.length; i++) {
				const friendId = friendIds[i];
				const friendPlanet = allPlanets.find(
					(planet) => planet.user_id === friendId
				);
				if (friendPlanet) {
					array.push(friendPlanet);
				}
			}

			setFriendPlanets(array);
		} catch (error) {
			console.error("Error fetching planets:", error);
		}
	};

	useEffect(() => {
		fetchFriendIds();
	}, []);

	useEffect(() => {
		if (friendIds.length > 0) {
			fetchPlanets(); // fetch planets when friendIds is updated
		}
	}, [friendIds]);

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
