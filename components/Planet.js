import { View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { findPlanetById } from "@/database/db";

// Import planet image
import PlanetImages from "@/assets/planet";

export default function Planet({
	userId,
	hardCodedEmotion = null, // If no user id, you can optionally provide the emotion to show
	width = 100,
	height = 100,
	isClickable = true, // Set isClickable = false if clicking the planet shouldn't navigate to account
	isNameVisible = true, // Set isNameVisible = false if the name should not be displayed
}) {
	const router = useRouter();
	const [user, setUser] = useState(null);

	const fetchUserInfo = async () => {
		if (hardCodedEmotion) {
			setUser({ first_name: "", emotion: hardCodedEmotion });
			return;
		}

		const user = await findPlanetById(userId);
		setUser(user);
	};

	useEffect(() => {
		fetchUserInfo();
	}, []);

	// Given an emotion, return the corresponding image
	const getImageFromEmotion = (emotion) => {
		switch (emotion) {
			case "happy":
				return PlanetImages.faces.happy;
			case "sad":
				return PlanetImages.faces.sad;
			case "angry":
				return PlanetImages.faces.angry;
			case "neutral":
				return PlanetImages.faces.neutral;
			default:
				return PlanetImages.faces.happy; // Default to happy
		}
	};

	const handlePress = () => {
		router.push(`tabs/galaxy/${userId}`);
	};

	if (user) {
		return (
			<View style={styles.container}>
				{isClickable ? (
					<TouchableOpacity onPress={handlePress}>
						<Image
							source={PlanetImages.base}
							style={[styles.planet, { width, height }]}
						/>
						<Image
							style={[styles.face, { width, height }]}
							source={getImageFromEmotion(user.emotion)}
						></Image>
					</TouchableOpacity>
				) : (
					<View>
						<Image
							source={PlanetImages.base}
							style={[styles.planet, { width, height }]}
						/>
						<Image
							style={[styles.face, { width, height }]}
							source={getImageFromEmotion(user.emotion)}
						/>
					</View>
				)}
				{isNameVisible && (
					<Text style={styles.relativeOverText}>
						{user.first_name}
					</Text>
				)}
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<Image
					source={PlanetImages.base}
					style={[styles.planet, { width, height }]}
				/>
				{isNameVisible && (
					<Text style={styles.relativeOverText}>Loading...</Text>
				)}
			</View>
		);
	}
}

const styles = {
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	face: {
		position: "absolute",
		top: 0, // Y offset of the text from the planet
	},
	relativeOverText: {
		top: -10, // Shift closer to planet
	},
};
