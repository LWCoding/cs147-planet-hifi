import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function AddFriends() {
  const router = useRouter();
  const { galaxyName } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{galaxyName ? galaxyName : "Loading..."}</Text>
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
  text: {
    color: "white",
    fontSize: 30,
  },
});
