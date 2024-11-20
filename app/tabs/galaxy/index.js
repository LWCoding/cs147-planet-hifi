import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList } from "react-native";

// Import components
import Planet from "@/components/Planet";

export default function Galaxy() {
	const planets = [
		{ username: "Anya", emotion: "happy" },
		{ username: "Jeff", emotion: "angry" },
		{ username: "Bezos", emotion: "neutral" },
		{ username: "Lucas", emotion: "sad" },
		{ username: "Carolyn", emotion: "happy" },
		{ username: "Evelyn", emotion: "angry" },
		{ username: "Kristine", emotion: "neutral" },
		{ username: "Gray", emotion: "sad" },
	];

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.planetContainer}
				data={planets}
				keyExtractor={(item) => item.username}
				renderItem={({ item }) => (
					<Planet username={item.username} emotion={item.emotion} />
				)}
			/>
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
	planetContainer: {
		width: "100%",
		height: "100%",
	},
});
