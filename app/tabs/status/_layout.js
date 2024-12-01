import { Stack } from "expo-router";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

export default function StatusStackLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Set Your Status",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "PPPierSans-Regular",
          },
        }}
      />
      <Stack.Screen
        name="textStatus"
        options={{
          title: "Text Status",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "PPPierSans-Regular",
          },
        }}
      />
      <Stack.Screen
        name="takePhoto"
        options={{
          title: "Take a Photo",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "PPPierSans-Regular",
          },
        }}
      />
      <Stack.Screen
        name="photoStatus"
        options={{
          title: "Photo Status",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "PPPierSans-Regular",
          },
        }}
      />
    </Stack>
  );
}
