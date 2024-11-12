import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";

// Import themes
import Theme from "@/assets/theme";

export default function Planet() {
  return (
    <View style={styles.container}>
      <IonIcon
        style={styles.absoluteObject}
        name="planet"
        size={100}
        color={Theme.colors.iconHighlighted}
      />
      <Text style={styles.relativeOver}>Planet object</Text>
    </View>
  );
}

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  relativeOver: {
    position: "relative",
    top: -60,
  },
};
