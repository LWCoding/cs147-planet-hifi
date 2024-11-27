import { Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    bodyLarge: {
      fontFamily: "PPPierSans-Regular", // Set your custom font here
      fontWeight: "400",
    },
    bodyMedium: {
      fontFamily: "PPPierSans-Regular",
      fontWeight: "400",
    },
    bodySmall: {
      fontFamily: "PPPierSans-Regular",
      fontWeight: "400",
    },
  },
  colors: {
    primary: "#9393BA",
    onPrimary: "rgb(71, 12, 122)",
    primaryContainer: "rgb(95, 43, 146)",
    onPrimaryContainer: "rgb(240, 219, 255)",
    secondary: "rgb(208, 193, 218)",
    onSecondary: "rgb(54, 44, 63)",
    secondaryContainer: "rgb(77, 67, 87)", // Will change the background of segmented buttons
    onSecondaryContainer: "rgb(237, 221, 246)",
    tertiary: "rgb(243, 183, 190)",
    onTertiary: "rgb(75, 37, 43)",
    tertiaryContainer: "rgb(101, 58, 65)",
    onTertiaryContainer: "rgb(255, 217, 221)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(29, 27, 30)",
    onBackground: "rgb(231, 225, 229)",
    surface: "rgb(29, 27, 30)",
    onSurface: "rgb(231, 225, 229)",
    surfaceVariant: "rgb(74, 69, 78)",
    onSurfaceVariant: "rgb(204, 196, 206)",
    outline: "rgb(150, 142, 152)",
    outlineVariant: "rgb(74, 69, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(231, 225, 229)",
    inverseOnSurface: "rgb(50, 47, 51)",
    inversePrimary: "rgb(120, 69, 172)",
    elevation: {
      level0: "transparent",
      level1: "rgb(39, 35, 41)",
      level2: "rgb(44, 40, 48)",
      level3: "rgb(50, 44, 55)",
      level4: "rgb(52, 46, 57)",
      level5: "rgb(56, 49, 62)",
    },
    surfaceDisabled: "rgba(231, 225, 229, 0.12)",
    onSurfaceDisabled: "rgba(231, 225, 229, 0.38)",
    backdrop: "rgba(51, 47, 55, 0.4)",
  },
};

export default function SlotLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "PPPierSans-Regular": require("../assets/fonts/PPPierSans-Regular.otf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Show a loading indicator while the font is being loaded
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
