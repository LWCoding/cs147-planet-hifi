import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "react-native-paper";
import { findCalendarInfoById } from "@/database/db";
import { Calendar } from 'react-native-big-calendar';

export default function CalendarView() {
  const { user: userId } = useLocalSearchParams(); // Get the user's info from navigation

  const [calendarInfo, setCalendarInfo] = useState(null);

  const theme = useTheme();

  const fetchCalendarInfo = async () => {
    try {
      const rawCalendarInfo = await findCalendarInfoById(userId); // Fetch the user's calendar info

      // Transform data to match BigCalendar's format
      if (Array.isArray(rawCalendarInfo)) {
        const transformedEvents = rawCalendarInfo.map((event) => ({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setCalendarInfo(transformedEvents);
      } else {
        console.warn("Invalid data format: expected an array");
        setCalendarInfo([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching calendar info:", error);
      setCalendarInfo([]);
    } finally {
      setLoading(false); // Ensure loading stops
    }
  };

  useEffect(() => {
    fetchCalendarInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Calendar events={calendarInfo} height={600} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
});
