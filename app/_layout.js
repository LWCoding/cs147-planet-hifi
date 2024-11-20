import { Slot } from "expo-router";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    primary: "#FF5C00", // Custom primary color
    background: "#232323",
    text: "#FFFFFF",
  },
};

export default function SlotLayout() {
  // Override default layout to ensure that our screen background bleeds
  // into the status bar.
  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
