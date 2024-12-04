import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
// Optional: Icons for the tabs (you can uncomment them if needed)
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import IonIcon from "@expo/vector-icons/Ionicons";

export default function Layout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable header for all screens
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarLabelStyle: {
          fontFamily: "PPPierSans-Regular", // Custom font for labels
          fontSize: 12, // Adjust size as needed
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          tabBarLabel: "New Galaxy",
          tabBarIcon: ({ color }) => (
            <IonIcon name="person-add" size={24} color={color} />
          ),
        }}
      />

      <Stack.Screen
        name="addFriends"
        options={{
          tabBarLabel: "Add Friends",
          tabBarIcon: ({ color }) => (
            <IonIcon name="person-add" size={24} color={color} />
          ),
        }}
      />
    </Stack>
  );
}
