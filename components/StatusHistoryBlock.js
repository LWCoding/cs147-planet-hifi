import { useState } from "react";
import { View, Image } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

// Import components
import Planet from "./Planet";

export default function ProfileButton({ user, status }) {
	const theme = useTheme();
	const [isImageLoaded, setIsImageLoaded] = useState(false);

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
			<View style={styles.textContainer}>
				<Text style={styles.timestamp}>
					<Text style={{ fontWeight: "bold" }}>
						{user.first_name}
					</Text>{" "}
					({formatTimestamp(status.created_at)})
				</Text>
				<Text numberOfLines={2} ellipsizeMode="tail">
					{status.status_text}
				</Text>
			</View>
			{status.image_url && (
				<Image
					source={{ uri: status.image_url }}
					style={[styles.image]}
					onLoadEnd={() => setIsImageLoaded(true)}
				/>
			)}
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
	textContainer: {
		flexDirection: "column",
		flex: 1,
		fontFamily: "PPPierSans-Regular",
		width: "100%",
		height: "100%",
		justifyContent: "space-evenly",
		padding: 5,
	},
	postImage: {
		flex: 1,
	},
	image: {
		width: 70,
		height: 70,
	},
};
