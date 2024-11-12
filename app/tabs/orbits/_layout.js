import { Stack } from "expo-router";

export default function OrbitsStackLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "My Profile",
					headerTitleAlign: "center",
				}}
			/>
		</Stack>
	);
}
