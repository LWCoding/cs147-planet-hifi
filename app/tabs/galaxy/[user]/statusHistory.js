import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import {
	fetchAllStatusesById,
	findPlanetById,
	findStatusById,
} from "@/database/db";

// Import components
import StatusHistoryBlock from "@/components/StatusHistoryBlock";

export default function statusHistory() {
	const { user: inputtedUserId } = useLocalSearchParams(); // Get the user's info from navigation

	const theme = useTheme();
	const [user, setUser] = useState(null);
	const [statuses, setStatuses] = useState(null);

	const fetchUserInfo = async () => {
		const user = await findPlanetById(inputtedUserId);
		const statuses = await fetchAllStatusesById(user.user_id);

		setUser(user);

		// Sort the statuses based on date (latest first)
		const statusesSorted = statuses.sort((a, b) => {
			return new Date(b.created_at) - new Date(a.created_at);
		});

		setStatuses(statusesSorted);
	};

	useEffect(() => {
		fetchUserInfo();
	}, []);

	if (!user || !statuses) {
		return (
			<View
				style={[
					styles.container,
					{ backgroundColor: theme.colors.background },
				]}
			>
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator size="large" animating={true} />
				</View>
			</View>
		);
	}

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
		>
			<Text style={styles.text}>{user.first_name}'s Post History</Text>
			<FlatList
				style={styles.statusesList}
				data={statuses}
				contentContainerStyle={{ alignItems: "center" }}
				keyExtractor={(item) => item.status_id.toString()}
				renderItem={({ item }) => (
					<StatusHistoryBlock status={item} user={user} />
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		// justifyContent: "center",
		position: "relative",
	},
	imageLoadingIndicator: {
		position: "absolute",
		top: "50%", // Position loading indicator over picture
	},
	activityIndicatorContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	text: {
		color: "white",
		fontWeight: "bold",
		fontSize: 30,
		margin: 30,
		fontFamily: "PPPierSans-Regular",
	},
	statusText: {
		color: "black",
		// fontWeight: "bold",
		fontFamily: "PPPierSans-Regular",
		fontSize: 15,
	},
	statusesList: {
		width: "100%",
	},
	statusContainer: {
		margin: 3,
		width: "80%",
		backgroundColor: "#CBCBE2",
		borderRadius: 15,
		padding: 15,
		alignItems: "center",
	},
});
