import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import db from "@/database/db";
import Planet from "@/components/Planet";

// NOTE FROM KRISTINE: if time, only display users not already added

export default function FriendComponent({
  galaxyName,
  planetObj,
  //   username,
  //   firstname,
  //   lastname,
}) {
  const userId = planetObj.user_id;
  const [added, setAdded] = useState(false);

  const addtoGalaxy = async () => {
    let updatedArray = [];

    try {
      const { data: galaxyData, error: fetchError } = await db
        .from("galaxies")
        .select("planets")
        .eq("name", galaxyName)
        .single();

      if (fetchError) {
        console.error("Error fetching galaxy:", fetchError);
        return;
      }
      updatedArray = galaxyData?.planets || [];

      const isAlreadyAdded = updatedArray.some(
        (planet) => planet.user_id === userId
      );
      if (isAlreadyAdded) {
        Alert.alert("This friend is already added to the galaxy.");
        return;
      }
      updatedArray.push(userId);

      const { data, error } = await db
        .from("galaxies")
        .upsert([{ name: galaxyName, planets: updatedArray }], {
          onConflict: ["name"],
        });

      if (error) {
        console.error("Error updating galaxy:", error);
      } else {
        console.log("Galaxy updated successfully:", data);
        setAdded(true);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // on render, useeffect check if someone is already in the array?

  return (
    <View style={styles.container}>
      <View style={styles.planet}>
        <Planet
          userId={userId}
          isClickable={false}
          isNameVisible={false}
        ></Planet>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.text}>{planetObj.first_name}</Text>
        <TouchableOpacity
          style={[styles.button, added && styles.buttonDisabled]}
          onPress={addtoGalaxy}
          disabled={added}
        >
          <Text style={styles.buttonText}>
            {added ? "Added!" : "Add Friend"}
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
    width: 300,
    height: 150,
    backgroundColor: "#ADADC5",
    borderRadius: 30,
    margin: 10,
    alignItems: "center",
    paddingBottom: 10,
    padding: 10,
  },
  rightContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
  },
  planet: {
    marginLeft: 10,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    margin: 15,
    fontFamily: "PPPierSans-Regular",
  },
  button: {
    padding: 10,
    backgroundColor: "#9393BA",
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    margin: 5,
    fontFamily: "PPPierSans-Regular",
  },
});
