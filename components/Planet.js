import { View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { findPlanetById } from "@/database/db";

// Import planet image
import PlanetImages from "@/assets/planet";

export default function Planet({
  userId,
  width = 100,
  height = 100,
  isClickable = true, // Set isClickable = false if clicking the planet shouldn't navigate to account
  isNameVisible = true, // Set isNameVisible = false if the name should not be displayed
}) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    const user = await findPlanetById(userId);
    setUser(user);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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

  const handlePress = () => {
    router.push(`tabs/galaxy/${userId}`);
  };

  if (user) {
    return (
      <View style={styles.container}>
        {isClickable ? (
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={PlanetImages.base}
              style={[styles.planet, { width, height }]}
            />
            <Image
              style={[styles.face, { width, height }]}
              source={getImageFromEmotion(user.emotion)}
            ></Image>
          </TouchableOpacity>
        ) : (
          <View>
            <Image
              source={PlanetImages.base}
              style={[styles.planet, { width, height }]}
            />
            <Image
              style={[styles.face, { width, height }]}
              source={getImageFromEmotion(user.emotion)}
            />
          </View>
        )}
        {isNameVisible && (
          <Text style={styles.relativeOverText}>{user.first_name}</Text>
        )}
      </View>
    );
  } else {
    return <ActivityIndicator size="small" animating={true} />;
  }
}

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  face: {
    position: "absolute",
    top: 0, // Y offset of the text from the planet
  },
  relativeOverText: {
    top: -10, // Shift closer to planet
  },
};
