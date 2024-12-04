import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "react-native-paper";
import { findCalendarInfoById } from "@/database/db";
import { Calendar } from "react-native-big-calendar";

export default function CalendarView() {
  const { user: userId } = useLocalSearchParams(); // Get the user's info from navigation

  const [calendarInfo, setCalendarInfo] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Track loading state

  const theme = useTheme();

  const fetchCalendarInfo = async () => {
    try {
      const rawCalendarInfo = await findCalendarInfoById(userId); // Fetch the user's calendar info
      console.log("Raw Data:", rawCalendarInfo);

      // Transform data to match BigCalendar's format
      if (Array.isArray(rawCalendarInfo)) {
        const transformedEvents = rawCalendarInfo.map((event) => ({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        console.log("Transformed Events:", transformedEvents);
        setCalendarInfo(transformedEvents);
      } else {
        console.warn("Invalid data format: expected an array");
        setCalendarInfo([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching calendar info:", error);
      setCalendarInfo([
        {
          title: "Mock Event",
          start: new Date(2024, 11, 4, 10, 0), // Corrected zero-indexed month
          end: new Date(2024, 11, 4, 10, 30),
        },
      ]);
    } finally {
      setLoading(false); // Ensure loading stops
    }
  };

  useEffect(() => {
    fetchCalendarInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Calendar events={calendarInfo} height={600} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
