import React, { useState, useEffect, useContext } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	Alert,
	ImageBackground,
	ScrollView,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import spaceBackgroundImage from "@/assets/space-bg.jpg";
// NOTE FROM KRISTINE: ADD BACK BUTTON NAV?

import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { findPlanetById, getAllGalaxyNamesById } from "@/database/db";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { UserContext } from "@/contexts/UserContext";
import Planet from "@/components/Planet";

export default function NewGalaxy() {
	const router = useRouter();
	const theme = useTheme();

	const { userId } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	const [galaxyName, setGalaxyName] = useState("New Galaxy");
	const [userPlanet, setUserPlanet] = useState(null);

	// Check if a provided galaxy name is already in use by the current user
	const checkExisting = async (galaxyName) => {
		const existingGalaxyNames = await getAllGalaxyNamesById(userId);
		return existingGalaxyNames.includes(galaxyName);
	};

	const fetchUser = async () => {
		// Fetch current user's planet from db
		const user = await findPlanetById(userId);
		setUserPlanet(user);
	};

	useFocusEffect(
		React.useCallback(() => {
			let isActive = true;

			const fetchData = async () => {
				if (!isActive) return;
				await fetchUser();
			};

			fetchData();

			return () => {
				isActive = false;
			};
		}, [])
	);

	const handleEdit = () => {
		setIsEditing(!isEditing);
	};

	const handleChangeText = (text) => {
		setGalaxyName(text); // updating as user types
	};

	const handleBlur = () => {
		if (galaxyName.trim() === "") {
			setGalaxyName("New Galaxy"); // resetting to placeholder if empty
		}
		setIsEditing(false);
	};

	const addFriends = async () => {
		const galaxyExists = await checkExisting(galaxyName);

		if (galaxyExists) {
			return Alert.alert(
				"Galaxy already exists! Choose a different name."
			);
		}
		if (galaxyName === "New Galaxy") {
			Alert.alert(
				"Confirm Galaxy Name", // Title of the alert
				'Are you sure you want to name your new galaxy "New Galaxy"?', // Message to display
				[
					{
						text: "Cancel",
					},
					{
						text: "Yes",
						isPreferred: true,
						onPress: () =>
							router.push({
								pathname: "tabs/galaxy/newGalaxy/addFriends",
								params: { galaxyName: galaxyName },
							}),
					},
				]
			);
			return;
		}
		router.push({
			pathname: "tabs/galaxy/newGalaxy/addFriends",
			params: { galaxyName: galaxyName },
		});
	};

	return (
		<ImageBackground
			source={spaceBackgroundImage}
			resizeMode="cover"
			style={styles.bgImage}
		>
			<ScrollView
				contentContainerStyle={{
					justifyContent: "flex-start",
					alignItems: "center",
				}}
				style={styles.container}
			>
				<View style={styles.newGalaxy}>
					{isEditing ? (
						<TextInput
							style={styles.textInput}
							value={galaxyName}
							onChangeText={handleChangeText}
							autoFocus={true}
							onBlur={handleBlur} // end editing when the input loses focus
						/>
					) : (
						// if not editing, render current galaxy name (default: new galaxy)
						<Text style={styles.text}>{galaxyName}</Text>
					)}
					<TouchableOpacity onPress={handleEdit}>
						<Icon name="pencil" size={30} color="#FFFFFF" />
					</TouchableOpacity>
				</View>
				<View padding={30}>
					<Planet
						width={150}
						height={150}
						isClickable={false}
						isNameVisible={false}
						userId={userId}
					/>
				</View>
				<TouchableOpacity
					style={styles.addFriends}
					onPress={addFriends}
				>
					<Text
						style={{
							fontFamily: "PPPierSans-Regular",
							fontSize: 16,
							color: "#000",
						}}
					>
						Create Galaxy
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 170,
	},
	bgImage: {
		flex: 1,
		height: "120%",
	},
	text: {
		fontSize: 35,
		fontWeight: "bold",
		marginRight: 10,
		fontFamily: "PPPierSans-Regular",
	},
	textInput: {
		fontSize: 35,
		fontWeight: "bold",
		marginRight: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		width: 200,
		fontFamily: "PPPierSans-Regular",
	},
	newGalaxy: {
		// view for pencil and text
		flexDirection: "row",
		alignItems: "center",
	},
	face: {
		width: 100,
		height: 100,
		position: "absolute",
		top: 30, // changed to 30 bc i put paddingtop
	},
	relativeOverText: {
		top: -10, // Shift closer to planet
		fontFamily: "PPPierSans-Regular",
	},
	addFriends: {
		backgroundColor: "#9393BA",
		borderRadius: 30,
		width: 180,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "PPPierSans-Regular",
	},
});
