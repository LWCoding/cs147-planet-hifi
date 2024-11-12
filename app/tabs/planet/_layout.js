import { Stack } from "expo-router";

export default function PlanetStackLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "My Planet",
					headerTitleAlign: "center",
				}}
			/>
		</Stack>
	);
}
