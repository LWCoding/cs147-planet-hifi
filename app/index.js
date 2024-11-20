import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

// Import components
import Login from "@/components/onboarding/Login";

/*
NOTE FROM LUCAS:
Instead of login screen this will eventually be onboarding
*/

export default function App() {
	return (
		<View style={styles.container}>
			<Login />
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
	link: {
		color: "blue",
		textDecorationLine: "underline",
		marginTop: 20,
	},
});
