import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import IonIcon from "@expo/vector-icons/Ionicons";

export default function Layout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarLabelStyle: {
          fontFamily: "PPPierSans-Regular",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="status"
        options={{
          tabBarLabel: "Status",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon
              name="emoticon-happy"
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
