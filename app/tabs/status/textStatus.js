import { StyleSheet, View } from "react-native";
import { Text, TextInput, SegmentedButtons, Button } from "react-native-paper";
import { useState } from "react";

import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import db from "@/database/db";

export default function TextStatus() {
  const theme = useTheme();
  const router = useRouter();

  const [statusText, setStatusText] = useState();
  const [emotion, setEmotion] = useState();

  // Given an emotion string and text for the user's current status, inserts that into the database
  const submitPost = async () => {
    try {
      // NOTE: We need to make this get the current user! Right now it always chooses James Landay
      const user = { user_id: "f79c391c-226f-4cdc-b85d-96b3b16a0a3e" };

      //   const info = await db.auth.getUser();
      //   const user = info.data.user;

      const { data, error } = await db.from("statuses").insert([
        {
          emotion: emotion,
          status_text: statusText,
          user_id: user.user_id,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      // TODO: Set the user's current status id to the status that was just made

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
        <Text margin={5}>I'm feeling...</Text>
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
        <Button icon="send" mode="contained" onPress={() => submitPost()}>
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
