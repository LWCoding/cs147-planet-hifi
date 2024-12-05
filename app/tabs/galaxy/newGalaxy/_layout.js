import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import IonIcon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
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
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => (
            <IonIcon
              name="arrow-back"
              size={30}
              color={theme.colors.text}
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            />
          ),
          headerStyle: {
            backgroundColor: "#9393BA",
          },
          headerTitle: "Create a New Galaxy",
        }}
      />

      <Stack.Screen
        name="addFriends"
        options={{
          headerShown: true, // Show header for this screen
          headerStyle: {
            backgroundColor: "#9393BA",
          },
          headerTitle: "Add friends!",

          headerLeft: () => (
            <IonIcon
              name="arrow-back"
              size={30}
              color={theme.colors.text}
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </Stack>
  );
}
