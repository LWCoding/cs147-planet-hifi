import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from "react-native";

// NOTE FROM KRISTINE: ADD BACK BUTTON NAV?

import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import PlanetImages from "@/assets/planet";
import db from "@/database/db";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function NewGalaxy() {
  const router = useRouter();
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [galaxyName, setGalaxyName] = useState("New Galaxy");
  const [userPlanet, setUserPlanet] = useState(null);

  // Given an emotion, return the corresponding image
  const getImageFromEmotion = (emotion) => {
    switch (emotion) {
      case "happy":
        return PlanetImages.faces.happy;
      case "sad":
        return PlanetImages.faces.sad;
      case "angry":
        return PlanetImages.faces.angry;
      case "neutral":
        return PlanetImages.faces.neutral;
      default:
        return PlanetImages.faces.happy; // Default to happy
    }
  };
  const checkExisting = async (galName) => {
    const { data, error } = await db
      .from("galaxies")
      .select("name")
      .eq("name", galaxyName);
    if (error) {
      console.error("err fetching galaxies");
      return;
    }
    if (data.length > 0) {
      Alert.alert("Galaxy already exists! Choose a different name.");
      return true;
    }
    return false;
  };
  const fetchUser = async () => {
    //fetching first user in db
    const { data: usersData, error: usersError } = await db
      .from("users")
      .select("*")
      .limit(1);

    if (usersError) {
      console.error("Error fetching users: " + usersError.message);
      return;
    }
    const { data: statusData, error: statusError } = await db
      .from("statuses")
      .select("*");

    if (statusError) {
      console.error("Error fetching statuses: " + statusError.message);
      return;
    }

    const user = usersData[0];

    let emotion = "happy";
    if (user.current_status_id) {
      const status = statusData.find(
        (status) => status.user_id === user.user_id
      );
      if (status) {
        emotion = status.emotion;
      }
    }

    const userInfo = {
      username: user.username,
      realname: user.first_name,
      emotion,
    };
    console.log(userInfo);
    setUserPlanet(userInfo);
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        if (!isActive) return;
        await fetchUser();
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChangeText = (text) => {
    setGalaxyName(text); // updating as user types
  };

  const handleBlur = () => {
    if (galaxyName.trim() === "") {
      setGalaxyName("New Galaxy"); // resetting to placeholder if empty
    }
    setIsEditing(false);
  };

  const addFriends = async () => {
    const galaxyExists = await checkExisting();
    if (galaxyExists) {
      return;
    }
    if (galaxyName === "New Galaxy") {
      alert("Please change the Galaxy name first!");
      return;
    }
    try {
      const { data: newGalaxy, error: insertError } = await db
        .from("galaxies")
        .insert([
          {
            name: galaxyName,
            planets: [],
          },
        ]);

      if (insertError) {
        console.error("Error inserting Galaxy: ", insertError.message);
        return;
      }
    } catch (error) {
      console.error("Error in addFriends function: ", error.message);
    }
    // console.log(galaxyName);

    router.push({
      pathname: "tabs/galaxy/newGalaxy/addFriends",
      params: { galaxyName: galaxyName },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.newGalaxy}>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={galaxyName}
            onChangeText={handleChangeText}
            autoFocus={true}
            onBlur={handleBlur} // end editing when the input loses focus
          />
        ) : (
          // if not editing, render current galaxy name (default: new galaxy)
          <Text style={styles.text}>{galaxyName}</Text>
        )}
        <TouchableOpacity onPress={handleEdit}>
          <Icon name="pencil" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.planetContainer}>
        <Image source={PlanetImages.base} style={styles.planet} />
        {userPlanet && (
          <Image
            style={styles.face}
            source={getImageFromEmotion(userPlanet.emotion)}
          />
        )}
      </View>
      <TouchableOpacity style={styles.addFriends} onPress={addFriends}>
        <Text
          style={{
            fontFamily: "PPPierSans-Regular",
            fontSize: 16,
            color: "#000",
          }}
        >
          Add friends!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 170,
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
  },
  text: {
    fontSize: 35,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginRight: 10,
    fontFamily: "PPPierSans-Regular",
  },
  textInput: {
    fontSize: 35,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 200,
    fontFamily: "PPPierSans-Regular",
  },
  newGalaxy: {
    // view for pencil and text
    flexDirection: "row",
    alignItems: "center",
  },

  face: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 30, // changed to 30 bc i put paddingtop
  },
  relativeOverText: {
    top: -10, // Shift closer to planet
    fontFamily: "PPPierSans-Regular",
  },
  planet: {
    width: 100,
    height: 100,
  },
  planetContainer: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addFriends: {
    backgroundColor: "#9393BA",
    borderRadius: 30,
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PPPierSans-Regular",
  },
});
