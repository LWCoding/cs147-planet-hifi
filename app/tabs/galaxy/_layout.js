import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

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
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: theme.colors.text,
          },
        }}
      />
      <Stack.Screen
        name="[user]/index"
        options={{
          title: "My Galaxy",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
