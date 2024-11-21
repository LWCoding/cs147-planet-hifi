import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NewGalaxy() {
  return (
    <View style={styles.container}>
      <Text>Create a New Galaxy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
