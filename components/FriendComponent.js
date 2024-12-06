import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Text, useTheme } from "react-native-paper";
import db from "@/database/db";
import Planet from "@/components/Planet";

// NOTE FROM KRISTINE: if time, only display users not already added

export default function FriendComponent({
  planetObj,
  toggleFriendInGalaxy,
  isToggled = false,
}) {
  const userId = planetObj.user_id;
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Planet
        planet={planetObj}
        width={80}
        height={80}
        isClickable={false}
        isNameVisible={false}
      />
      <View style={styles.rightContainer}>
        <Text variant="titleLarge" style={styles.text}>
          {planetObj.first_name}
        </Text>
        <TouchableOpacity
          style={[
            {
              backgroundColor: isToggled
                ? theme.colors.secondary
                : theme.colors.primary,
            },
            styles.button,
          ]}
          onPress={() => {
            toggleFriendInGalaxy(userId);
          }}
        >
          <Text variant="labelLarge" style={styles.buttonText}>
            {isToggled ? "Remove Friend" : "Add Friend"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    width: 320,
    height: 105,
    backgroundColor: "#ADADC5",
    borderRadius: 30,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rightContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    margin: 5,
    fontFamily: "PPPierSans-Regular",
  },
  button: {
    padding: 10,
    margin: 5,
    width: 120,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "PPPierSans-Regular",
  },
});
