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
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <ScrollView horizontal style={styles.calendarContainer}>
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
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Space around the container
    backgroundColor: '#f0f0f0',
  },
  innerContainer: {
    width: '95%', // Shrinks the calendar width to leave space on the sides
    height: '90%', // Adjust height as needed
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden', // Ensures the calendar fits neatly inside the container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  calendarContainer: {
    flex: 1,
  },
  dayColumn: {
    width: 80, // Shrinks the width of each day column
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  dayHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
  },
  hourBlock: {
    height: 40, // Reduce the height per hour block
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  availableBlock: {
    backgroundColor: 'green',
    borderRadius: 5, // Slightly rounded corners for available blocks
  },
  hourText: {
    fontSize: 10,
    color: '#333',
  },
});

export default Calendar;
