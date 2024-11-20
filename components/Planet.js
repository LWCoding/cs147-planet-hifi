import { Text, View, Image } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";

// Import themes
import Theme from "@/assets/theme";

// Import planet image
import PlanetBG from "@/assets/planet/planet-bg.png";

export default function Planet({ username }) {
	return (
		<View style={styles.container}>
			<Image source={PlanetBG} style={styles.planet} />
			<Text style={styles.relativeOver}>{username}</Text>
		</View>
	);
}

const styles = {
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	relativeOver: {
		position: "relative",
		top: -5, // Y offset of the text from the planet
	},
	planet: {
		width: 100,
		height: 100,
	},
};
