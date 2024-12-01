import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function GalaxyStackLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "My Galaxy",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "PPPierSans-Regular", // Custom font
            color: theme.colors.text,
          },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("hi button pressed")}
              style={{ marginRight: 10 }}
            >
              <MaterialIcons
                name="arrow-forward"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="newGalaxy"
        options={{
          headerTitle: "Create Galaxy",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
            fontFamily: "PPPierSans-Regular", // Custom font
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "PPPierSans-Regular", // Custom font
          },
        }}
      />
      <Stack.Screen
        name="manageAll"
        options={{
          title: "Manage Friends",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
            fontFamily: "PPPierSans-Regular", // Custom font
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "PPPierSans-Regular", // Custom font
          },
        }}
      />
      <Stack.Screen
        name="[user]"
        options={{
          headerTitle: "",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "PPPierSans-Regular", // Custom font
          },
        }}
      />
    </Stack>
  );
}
