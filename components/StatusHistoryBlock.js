import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

// Import components
import Planet from "./Planet";

export default function ProfileButton({ user, status }) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Planet
        isClickable={false}
        isNameVisible={false}
        width={50}
        height={50}
        userId={user.user_id}
      />
      <Text style={styles.timestamp}>{status.created_at}</Text>
      <Image style={styles.postImage} source={{ uri: status.image_url }} />
      <Text style={styles.postText}>{status.status_text}</Text>
    </View>
  );
}

const styles = {
  container: {
    width: "95%",
    height: 80,
    margin: 5,
    borderRadius: "5%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PPPierSans-Regular",
  },
  postImage: {
    flex: 1,
  },
  postText: {
    textAlign: "center",
    flex: 3,
    paddingHorizontal: 5,
    fontFamily: "PPPierSans-Regular",
  },
};
