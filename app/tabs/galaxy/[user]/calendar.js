import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Days of the week
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Function to generate random availability for each day
const generateRandomAvailability = () => {
  const availability = {};
  days.forEach((day) => {
    const numBlocks = Math.floor(Math.random() * 10) + 1; // Randomize 1–10 available blocks
    const blocks = Array.from({ length: numBlocks }, () =>
      Math.floor(Math.random() * 24) + 1 // Randomize hours (1–24)
    );
    availability[day] = [...new Set(blocks)]; // Ensure no duplicates
  });
  return availability;
};

// Convert 24-hour format to 12-hour AM/PM format
const formatHour = (hour) => {
  const period = hour < 12 ? 'AM' : 'PM';
  const adjustedHour = hour % 12 || 12; // Convert to 12-hour format (12 for midnight/noon)
  return `${adjustedHour} ${period}`;
};

const Calendar = () => {
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    setAvailability(generateRandomAvailability());
  }, []);

  return (
    <ScrollView style={styles.outerScrollContainer}>
      <ScrollView horizontal style={styles.calendarContainer}>
        <View style={styles.calendarContent}>
          {days.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dayColumn}>
              <Text style={styles.dayHeader}>{day}</Text>
              {Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => (
                <View
                  key={hour}
                  style={[
                    styles.hourBlock,
                    availability[day]?.includes(hour) && styles.availableBlock,
                  ]}
                >
                  <Text style={styles.hourText}>{formatHour(hour)}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerScrollContainer: {
    flex: 1,
    padding: 10, // Padding around the calendar container for spacing
    backgroundColor: '#f0f0f0', // Light background for better contrast
  },
  calendarContainer: {
    flex: 1, // Enables horizontal scrolling for the calendar
  },
  calendarContent: {
    flexDirection: 'row', // Align day columns horizontally
  },
  dayColumn: {
    width: 80, // Fixed width for each day column
    borderRightWidth: 1, // Separator between days
    borderColor: '#ddd', // Light gray color for separators
  },
  dayHeader: {
    textAlign: 'center', // Center-align day names
    fontWeight: 'bold', // Bold day names
    padding: 5, // Space around the day name
    backgroundColor: '#f5f5f5', // Light background for day headers
    borderBottomWidth: 1, // Separator below day headers
    borderColor: '#ddd', // Light gray color for separators
    fontSize: 14, // Font size for day names
  },
  hourBlock: {
    height: 40, // Height for each hour block
    justifyContent: 'center', // Center-align content vertically
    alignItems: 'center', // Center-align content horizontally
    borderBottomWidth: 1, // Separator between hour blocks
    borderColor: '#ddd', // Light gray color for separators
  },
  availableBlock: {
    backgroundColor: 'green', // Highlight availability in green
    borderRadius: 5, // Rounded corners for availability blocks
  },
  hourText: {
    fontSize: 10, // Smaller font size for hour labels
    color: '#333', // Dark gray color for text
  },
});

export default Calendar;
