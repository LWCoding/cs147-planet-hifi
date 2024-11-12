import { Tabs } from "expo-router";

export default function Layout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="status" options={{ tabBarLabel: "Status" }} />
			<Tabs.Screen name="orbits" options={{ tabBarLabel: "Orbits" }} />
			<Tabs.Screen name="planet" options={{ tabBarLabel: "My Planet" }} />
		</Tabs>
	);
}
