import { StyleSheet, View } from "react-native";
import { Text, TextInput, SegmentedButtons, Button } from "react-native-paper";
import { useState, useContext } from "react";

import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import db from "@/database/db";

// Import user context
import { UserContext } from "@/contexts/UserContext";

export default function TextStatus() {
  const theme = useTheme();
  const router = useRouter();

  const [statusText, setStatusText] = useState();
  const [emotion, setEmotion] = useState();
  const { userId } = useContext(UserContext);

  // Given an emotion string and text for the user's current status, inserts that into the database
  const submitPost = async () => {
    try {
      const { data: createdStatusData, error: createdStatusError } = await db
        .from("statuses")
        .insert([
          {
            emotion: emotion,
            status_text: statusText,
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

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View margin={10}>
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
      </View>
      <View margin={10}>
        <TextInput
          placeholder="What's on your mind?"
          value={statusText}
          multiline={true}
          numberOfLines={3}
          onChangeText={(text) => setStatusText(text)}
        />
      </View>
      <View margin={10}>
        <Button
          disabled={!statusText || !emotion}
          icon="send"
          mode="contained"
          onPress={() => submitPost()}
        >
          Post
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
