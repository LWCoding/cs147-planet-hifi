import { StyleSheet, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function expandImage() {
  const { url } = useLocalSearchParams();
  console.log("hh:", url);

  return (
    <View style={styles.container}>
      <Image source={{ uri: url }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
