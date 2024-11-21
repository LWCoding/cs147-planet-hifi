import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function addFriendstoGalaxy() {
  return (
    <View style={styles.container}>
      <Text>add friends</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
  },
});
