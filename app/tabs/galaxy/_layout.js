import { Stack } from "expo-router";

export default function GalaxyStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "My Galaxy",
          headerTitleAlign: "center",
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
