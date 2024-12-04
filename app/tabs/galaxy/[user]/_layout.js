import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "react-native-paper";

export default function UserLayout() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Stack options={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="image"
        options={{
          presentation: "modal",
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="statusHistory"
        options={{
          presentation: "modal",
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="calendar"
        options={{
          presentation: "modal",
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
    </Stack>
  );
}
