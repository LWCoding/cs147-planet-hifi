import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';

// Days of the week (Monday-Friday only for scheduling)
const daysForScheduling = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// Function to generate random availability for each day
const generateRandomAvailability = () => {
  const availability = {};
  daysForScheduling.forEach((day) => {
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');

  useEffect(() => {
    setAvailability(generateRandomAvailability());
  }, []);

  // Handle scheduling popup open/close
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  // Handle notification confirmation
  const handleSendNotification = () => {
    setModalVisible(false);
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false), 2000); // Auto-close notification popup
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Calendar */}
      <ScrollView style={styles.outerScrollContainer}>
        <ScrollView horizontal style={styles.calendarContainer}>
          <View style={styles.calendarContent}>
            {daysForScheduling.map((day, dayIndex) => (
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

      {/* Schedule a Time Button */}
      <TouchableOpacity style={styles.scheduleButton} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>Schedule a Time</Text>
      </TouchableOpacity>

      {/* Schedule Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Schedule a Time</Text>

            {/* Day Input */}
            <Text>Day (Mon-Fri):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter day (e.g., Mon)"
              value={selectedDay}
              onChangeText={setSelectedDay}
            />

            {/* Time Input */}
            <Text>Time (0-12):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter time (e.g., 10)"
              keyboardType="numeric"
              value={selectedTime}
              onChangeText={setSelectedTime}
            />

            {/* AM/PM Input */}
            <Text>AM/PM:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter AM or PM"
              value={selectedPeriod}
              onChangeText={setSelectedPeriod}
            />

            {/* Send Notification Button */}
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendNotification}
            >
              <Text style={styles.buttonText}>Send Notification</Text>
            </TouchableOpacity>

            {/* Close Modal Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Notification Popup */}
      {isNotificationVisible && (
        <View style={styles.notificationPopup}>
          <Text style={styles.notificationText}>Notification Sent!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerScrollContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  calendarContainer: {
    flex: 1,
  },
  calendarContent: {
    flexDirection: 'row',
  },
  dayColumn: {
    width: 80,
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
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  availableBlock: {
    backgroundColor: 'green',
    borderRadius: 5,
  },
  hourText: {
    fontSize: 10,
    color: '#333',
  },
  scheduleButton: {
    backgroundColor: '#007bff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notificationPopup: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
  },
  notificationText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Calendar;
