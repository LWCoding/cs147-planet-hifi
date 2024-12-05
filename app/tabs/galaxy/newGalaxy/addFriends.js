import { useEffect, useState, useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import db, { fetchFriends } from "@/database/db";
import { fetchAllPlanets } from "@/database/db";
import FriendComponent from "@/components/FriendComponent";
import spaceBackgroundImage from "@/assets/space-bg.jpg";

export default function AddFriends() {
	const router = useRouter();
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
			style={styles.image}
		>
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<Text style={styles.topText}>Add friends to</Text>
					<Text style={styles.text}>{galaxyName}</Text>
				</View>
				<FlatList
					data={friendPlanets}
					renderItem={({ item }) => (
						<FriendComponent
							galaxyName={galaxyName}
							planetObj={item}
							// userId={item.user_id}
							// username={item.username}
							// firstname={item.first_name}
							// lastname={item.last_name}
						/>
					)}
				></FlatList>
				<View style={styles.bottomContainer}>
					<Text style={styles.bottomText}>
						"Don't see your friend? Add them from Contacts or invite
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
		// backgroundColor: "rgb(29, 27, 30)",
	},
	image: {
		flex: 1,
	},
	text: {
		color: "white",
		fontSize: 35,
		fontFamily: "PPPierSans-Regular",
	},
	topText: {
		color: "white",
		fontSize: 18,
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
		color: "white",
		fontSize: 13,
		fontStyle: "italic",
	},
});
