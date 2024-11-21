import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function GalaxyStackLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="addFriends"
        options={{
          headerTitle: "Add friends!", // maybe also make it dynamci like 'add friends to CS147L! Or whatever the galaxy name is
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="manageAll"
        options={{
          title: "Manage All Friends",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="[user]/index"
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
}
