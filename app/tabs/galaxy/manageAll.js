import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function manageAll() {
  return (
    <View style={styles.container}>
      <Text>manage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
    fontFamily: "PPPierSans-Regular"
  },
});
