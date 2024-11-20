import { Tabs } from "expo-router";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import IonIcon from "@expo/vector-icons/Ionicons";

// Import themes
import Theme from "@/assets/theme";

export default function Layout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Theme.colors.iconHighlighted,
			}}
		>
			<Tabs.Screen
				name="status"
				options={{
					tabBarLabel: "Status",
					tabBarIcon: ({ color }) => (
						<MaterialIcon
							name="emoji-emotions"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="galaxy"
				options={{
					tabBarLabel: "Galaxy",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcon
							name="orbit"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="planet"
				options={{
					tabBarLabel: "My Planet",
					tabBarIcon: ({ color }) => (
						<IonIcon name="planet" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
