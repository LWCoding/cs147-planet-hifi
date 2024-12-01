import { StyleSheet, View, Alert } from "react-native";
import { Text, TextInput, SegmentedButtons, Button } from "react-native-paper";
import { useState } from "react";

import { useTheme } from "react-native-paper";

export default function TextStatus() {
  const theme = useTheme();
  const [text, setText] = useState();
  const [emotion, setEmotion] = useState();
  // NOTE FROM KRISTINE: oh just realized we prob want to do what we did in A4 where we don't let users click on post if everything is null / disable the post button...
  const handlePost = () => {
    // Alert.alert("Your status has been updated!", [{ text: "OK :)" }]);
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
          value={text}
          multiline={true}
          numberOfLines={3}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View margin={10}>
        <Button icon="send" mode="contained" onPress={() => handlePost()}>
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
