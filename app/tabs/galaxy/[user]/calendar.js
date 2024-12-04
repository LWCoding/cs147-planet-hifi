import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const hours = Array.from({ length: 24 }, (_, i) => i); // 24 hours
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Function to generate random availability
const generateRandomAvailability = () => {
  const availability = {};
  days.forEach((day) => {
    const availableHours = [];
    const count = Math.floor(Math.random() * 5) + 1; // Random number of available hours (1-5)
    while (availableHours.length < count) {
      const randomHour = Math.floor(Math.random() * 24);
      if (!availableHours.includes(randomHour)) {
        availableHours.push(randomHour);
      }
    }
    availability[day] = availableHours.sort((a, b) => a - b); // Sort hours for better visualization
  });
  return availability;
};

const Calendar = () => {
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    setAvailability(generateRandomAvailability()); // Set random availability on component mount
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <ScrollView horizontal style={styles.calendarContainer}>
          {days.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dayColumn}>
              <Text style={styles.dayHeader}>{day}</Text>
              {hours.map((hour) => (
                <View
                  key={hour}
                  style={[
                    styles.hourBlock,
                    availability[day]?.includes(hour) && styles.availableBlock,
                  ]}
                >
                  <Text style={styles.hourText}>{hour}:00</Text>
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
