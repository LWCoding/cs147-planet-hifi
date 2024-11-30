import Planet from "@/components/Planet";
import { UserContext } from "@/contexts/UserContext";
import db, { findPlanetById } from "@/database/db";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";

import { useTheme } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

export default function PhotoStatus() {
  const theme = useTheme();
  const { uri } = useLocalSearchParams();
  const [userPlanet, setUserPlanet] = useState({});

  const { userId } = useContext(UserContext);

  // Fetch the user's info from the database
  const fetchMainUserInfo = async () => {
    const planet = await findPlanetById(userId);

    setUserPlanet(planet);
  };

  useEffect(() => {
    fetchMainUserInfo();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.photoContainer}>
        <Image
          style={[
            styles.photo,
            { width: screenWidth, height: (screenWidth * 3) / 4 },
          ]}
          source={{ uri: uri }}
        />
        <View style={styles.photoPlanet}>
          <Planet
            username={userPlanet.username}
            realname={userPlanet.first_name}
            emotion={userPlanet.emotion}
            isClickable={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photo: {
    position: "relative",
  },
  photoPlanet: {
    position: "absolute",
    top: "85%",
    left: "10%",
  },
});
