import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "react-native-paper";
import { findCalendarInfoById } from "@/database/db";

export default function Calendar() {
  const { user: userId } = useLocalSearchParams(); // Get the user's info from navigation

  const [calendarInfo, setCalendarInfo] = useState(null);

  const theme = useTheme();

  const fetchCalendarInfo = async () => {
    // Fetch the user's calendar information
    const calendarInfo = await findCalendarInfoById(userId);

    console.log(calendarInfo);
    setCalendarInfo(calendarInfo); // Store calendar info
  };

  useEffect(() => {
    fetchCalendarInfo();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text>Calendar information here (TODO)! User id: {userId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
});
