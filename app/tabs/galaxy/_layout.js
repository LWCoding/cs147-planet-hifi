import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function GalaxyStackLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "My Galaxy",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: theme.colors.text,
          },
          headerRight: () => (
            <TouchableOpacity // copied this over from my pre-github version lol - kristine
              onPress={() => console.log("hi button pressed")} //eventually this should navigate to other planets - kristine navigation.navigate("nextStackName")}
              style={{ marginRight: 10 }}
            >
              <MaterialIcons
                name="arrow-forward"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity> // => navigation.navigate("nextStackName")
          ),
        }}
      />
      <Stack.Screen
        name="newGalaxy"
        options={{
          title: "Create a new Galaxy!",
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
