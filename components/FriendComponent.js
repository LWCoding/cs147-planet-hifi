import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Text, useTheme } from "react-native-paper";
import db from "@/database/db";
import Planet from "@/components/Planet";

// NOTE FROM KRISTINE: if time, only display users not already added

export default function FriendComponent({
	galaxyName,
	planetObj,
	toggleFriendInGalaxy,
	//   username,
	//   firstname,
	//   lastname,
}) {
	const userId = planetObj.user_id;
	const [isAdded, setIsAdded] = useState(false);
	const theme = useTheme();

	// const addtoGalaxy = async () => {
	// 	let updatedArray = [];

	// 	try {
	// 		const { data: galaxyData, error: fetchError } = await db
	// 			.from("galaxies")
	// 			.select("planets")
	// 			.eq("name", galaxyName)
	// 			.single();

	// 		if (fetchError) {
	// 			console.error("Error fetching galaxy:", fetchError);
	// 			return;
	// 		}
	// 		updatedArray = galaxyData?.planets || [];

	// 		const isAlreadyAdded = updatedArray.some(
	// 			(planet) => planet.user_id === userId
	// 		);
	// 		if (isAlreadyAdded) {
	// 			Alert.alert("This friend is already added to the galaxy.");
	// 			return;
	// 		}
	// 		updatedArray.push(userId);

	// 		const { data, error } = await db
	// 			.from("galaxies")
	// 			.upsert([{ name: galaxyName, planets: updatedArray }], {
	// 				onConflict: ["name"],
	// 			});

	// 		if (error) {
	// 			console.error("Error updating galaxy:", error);
	// 		} else {
	// 			console.log("Galaxy updated successfully:", data);
	// 			setAdded(true);
	// 		}
	// 	} catch (error) {
	// 		console.error("Unexpected error:", error);
	// 	}
	// };

	// on render, useeffect check if someone is already in the array?

	return (
		<View style={styles.container}>
			<Planet
				userId={userId}
				width={80}
				height={80}
				isClickable={false}
				isNameVisible={false}
			/>
			<View style={styles.rightContainer}>
				<Text variant="titleLarge" style={styles.text}>
					{planetObj.first_name}
				</Text>
				<TouchableOpacity
					style={[
						{
							backgroundColor: isAdded
								? theme.colors.secondary
								: theme.colors.primary,
						},
						styles.button,
					]}
					onPress={() => {
						const inGalaxy = toggleFriendInGalaxy(userId);
						setIsAdded(inGalaxy);
					}}
				>
					<Text variant="labelLarge" style={styles.buttonText}>
						{isAdded ? "Uninvite Friend" : "Invite Friend"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexDirection: "row",
		width: 320,
		height: 105,
		backgroundColor: "#ADADC5",
		borderRadius: 30,
		margin: 10,
		alignItems: "center",
		justifyContent: "space-evenly",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	rightContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 15,
	},
	text: {
		color: "black",
		fontWeight: "bold",
		margin: 5,
		fontFamily: "PPPierSans-Regular",
	},
	button: {
		padding: 10,
		margin: 5,
		width: 120,
		borderRadius: 30,
		alignItems: "center",
	},
	buttonText: {
		color: "black",
		fontWeight: "bold",
		fontFamily: "PPPierSans-Regular",
	},
});
