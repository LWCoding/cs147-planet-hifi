import Planet from "@/components/Planet";
import { UserContext } from "@/contexts/UserContext";
import db, { findPlanetById } from "@/database/db";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Image, Dimensions } from "react-native";
import { Text, SegmentedButtons, Button, TextInput } from "react-native-paper";

import { useTheme } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

export default function PhotoStatus() {
  const theme = useTheme();
  const router = useRouter();
  const { uri } = useLocalSearchParams();

  const [user, setUser] = useState(null);
  const [emotion, setEmotion] = useState(null);
  const [statusText, setStatusText] = useState(null);

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
            emotion,
            status_text: statusText,
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
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View margin={10}>
          <Text variant="titleLarge" margin={5}>
            Photo Preview
          </Text>
        </View>
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
        <View top={65} margin={10}>
          <Text variant="titleLarge" margin={5}>
            I'm feeling...
          </Text>
          <SegmentedButtons
            value={emotion}
            onValueChange={setEmotion}
            buttons={[
              {
                value: "happy",
                label: "Happy",
              },
              {
                value: "neutral",
                label: "Neutral",
              },
              { value: "sad", label: "Sad" },
              { value: "angry", label: "Angry" },
            ]}
          />
          <View margin={10}>
            <TextInput
              placeholder="What's on your mind?"
              value={statusText}
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) => setStatusText(text)}
            />
          </View>
          <Button icon="send" mode="contained" onPress={() => submitPost()}>
            Post
          </Button>
        </View>
      </ScrollView>
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
