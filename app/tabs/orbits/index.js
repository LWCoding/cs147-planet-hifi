import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button, View } from "react-native";

// Import components
import { Planet } from "@/components/Planet";

export default function Orbits() {
  return (
    <View style={styles.container}>
      <Text>Planet orbits screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
