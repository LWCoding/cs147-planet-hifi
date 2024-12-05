import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

// Import components
import Planet from "./Planet";

export default function ProfileButton({ user, status }) {
	const theme = useTheme();

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);

		// Get month (add 1 to correct the zero-based index)
		const month = date.getMonth() + 1; // Add 1 to month to make it human-readable
		const day = date.getDate();

		// Get hours and handle the 12-hour format
		let hours = date.getHours();
		const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure two-digit minute format

		// Handle AM/PM
		const ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours === 0 ? 12 : hours; // If hours is 0, set it to 12

		return `${month}/${day} at ${hours}:${minutes}${ampm}`;
	};

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.colors.primary },
			]}
		>
			<Planet
				isClickable={false}
				isNameVisible={false}
				width={50}
				height={50}
				hardCodedEmotion={status.emotion}
			/>
			<Text style={styles.timestamp}>
				{formatTimestamp(status.created_at)}
			</Text>
			<Image
				style={styles.postImage}
				source={{ uri: status.image_url }}
			/>
			<Text style={styles.postText}>{status.status_text}</Text>
		</View>
	);
}

const styles = {
	container: {
		width: "95%",
		height: 80,
		margin: 5,
		padding: 10,
		borderRadius: "5%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "PPPierSans-Regular",
	},
	postImage: {
		flex: 1,
	},
	postText: {
		textAlign: "center",
		flex: 3,
		paddingHorizontal: 5,
		fontFamily: "PPPierSans-Regular",
	},
};
