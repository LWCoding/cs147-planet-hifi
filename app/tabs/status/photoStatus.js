import Planet from "@/components/Planet";
import { UserContext } from "@/contexts/UserContext";
import db, { findPlanetById } from "@/database/db";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
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

        router.push(`tabs/galaxy/${userId}`);
      } catch (error) {
      console.error("Error adding post:", error.message);
    }
  };

  if (user) {
    return (
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Use 'padding' for iOS and 'height' for Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust offset if necessary
      >
        <ScrollView contentContainerStyle={[styles.scrollContent]}>
          <View margin={10}>
            <Text variant="titleLarge" margin={5} style={styles.label}>
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
          <View top={65}>
            <Text variant="titleLarge" margin={5} style={styles.prompt_label}>
              I'm feeling...
            </Text>
            <View margin={10}>
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
                disabled={!emotion || !statusText}
                icon="send"
                mode="contained"
                onPress={() => submitPost()}
                style={{
                  backgroundColor:
                    !emotion || !statusText
                      ? theme.colors.disabled
                      : theme.colors.primary, // Use the theme's primary color for enabled state
                }}
              >
                Post
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  photo: {
    position: "relative",
  },
  photoPlanet: {
    position: "absolute",
    top: "85%",
    left: "37.5%",
    
  },
  label: {
    fontFamily: "PPPierSans-Regular",
  },

  prompt_label: {
    fontFamily: "PPPierSans-Regular",
    paddingHorizontal: 12
  },
});
