import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

// Import components
import Planet from "@/components/Planet";

export default function Galaxy() {
	return (
		<View style={styles.container}>
			<Planet username="Anya" />
			<Planet username="Jeff" />
			<Planet username="Bezos" />
			<Planet username="Lucas" />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
