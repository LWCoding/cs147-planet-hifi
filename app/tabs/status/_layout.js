import { Stack } from "expo-router";

export default function StatusStackLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "My Status",
					headerTitleAlign: "center",
				}}
			/>
		</Stack>
	);
}
