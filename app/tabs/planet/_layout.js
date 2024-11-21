import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function PlanetStackLayout() {
  const theme = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "My Planet",
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
