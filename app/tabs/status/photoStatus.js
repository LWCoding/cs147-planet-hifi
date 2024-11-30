import Planet from "@/components/Planet";
import { UserContext } from "@/contexts/UserContext";
import db, { findPlanetById } from "@/database/db";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";

import { Button, useTheme } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

export default function PhotoStatus() {
  const theme = useTheme();
  const router = useRouter();
  const { uri } = useLocalSearchParams();
  const [user, setUser] = useState(null);

  const { userId } = useContext(UserContext);

  // Fetch the user's info from the database
  const fetchMainUserInfo = async () => {
    const user = await findPlanetById(userId);

    setUser(user);
  };

  useEffect(() => {
    fetchMainUserInfo();
  }, []);

  // Inserts post into database
  const submitPost = async () => {
    try {
      const { data: createdStatusData, error: createdStatusError } = await db
        .from("statuses")
        .insert([
          {
            emotion: "happy",
            status_text: "This is a test picture status", // TODO: Add text box and integrate into status posting
            image_url: uri,
            user_id: userId,
          },
        ])
        .single()
        .select();

      if (createdStatusError) {
        throw new Error(error.message);
      }

      // Set the user's current status id to the status that was just made
      await db
        .from("users")
        .update({ current_status_id: createdStatusData.status_id })
        .eq("user_id", userId);

      router.back(); // Send user back after posting
    } catch (error) {
      console.error("Error adding post:", error.message);
    }
  };

  if (user) {
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
            <Planet userId={user.user_id} isClickable={false} />
          </View>
        </View>
        <View top={80} margin={10}>
          <Button icon="send" mode="contained" onPress={() => submitPost()}>
            Post
          </Button>
        </View>
      </View>
    );
  }
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
