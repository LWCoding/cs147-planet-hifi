import { Tabs } from "expo-router";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import IonIcon from "@expo/vector-icons/Ionicons";

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
            <MaterialIcon name="emoji-emotions" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orbits"
        options={{
          tabBarLabel: "Orbits",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="orbit" size={24} color={color} />
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
