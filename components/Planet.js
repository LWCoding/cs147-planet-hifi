import { Text, View, Image } from "react-native";

// Import planet image
import PlanetImages from "@/assets/planet";

export default function Planet({ username, emotion }) {
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

	return (
		<View style={styles.container}>
			<Image source={PlanetImages.base} style={styles.planet} />
			<Image
				style={styles.face}
				source={getImageFromEmotion(emotion)}
			></Image>
			<Text style={styles.relativeOverText}>{username}</Text>
		</View>
	);
}

const styles = {
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	face: {
		width: 100,
		height: 100,
		position: "absolute",
		top: 0, // Y offset of the text from the planet
	},
	relativeOverText: {
		top: -10, // Shift closer to planet
	},
	planet: {
		width: 100,
		height: 100,
	},
};
