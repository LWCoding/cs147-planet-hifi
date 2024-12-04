import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function FriendComponent({
  userId,
  username,
  firstname,
  lastname,
}) {
  return (
    <View style={styles.container}>
      <Text>{userId}</Text>
      <Text style={styles.text}>{firstname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    position: "relative",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    margin: 40,
  },
});
