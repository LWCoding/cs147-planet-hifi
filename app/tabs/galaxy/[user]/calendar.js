import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

// Days of the week (Monday-Sunday for scheduling)
const daysForScheduling = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const periods = ['AM', 'PM']; // AM/PM options

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

const Calendar = () => {
  const [availability, setAvailability] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    setAvailability(generateRandomAvailability());
  }, []);

  // Handle scheduling popup open/close
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  // Validate inputs and handle notification
  const handleSendNotification = () => {
    if (!selectedDay) {
      Alert.alert('Error', 'Please select a day.');
      return;
    }
    if (!selectedTime || isNaN(selectedTime) || selectedTime < 1 || selectedTime > 12) {
      Alert.alert('Error', 'Please enter a valid hour between 1 and 12.');
      return;
    }
    if (!selectedMinute || isNaN(selectedMinute) || selectedMinute < 0 || selectedMinute > 59) {
      Alert.alert('Error', 'Please enter a valid minute between 0 and 59.');
      return;
    }
    if (!selectedPeriod) {
      Alert.alert('Error', 'Please select AM or PM.');
      return;
    }

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
                    <Text style={styles.hourText}>{`${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`}</Text>
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

            {/* Day Selection */}
            <Text>Day (Mon-Sun):</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollableOptions}>
              {daysForScheduling.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.option,
                    selectedDay === day && { backgroundColor: '#575788' },
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text style={[styles.optionText, selectedDay === day && { color: 'white' }]}>{day}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Hour and Minute Inputs Side by Side */}
            <View style={styles.timeContainer}>
              {/* Hour Input */}
              <View style={styles.inputWrapper}>
                <Text>Hour (1-12):</Text>
                <TextInput
                  style={styles.inputBox}
                  keyboardType="numeric"
                  placeholder="Hour"
                  value={selectedTime}
                  onChangeText={(text) => setSelectedTime(text)}
                />
              </View>

              {/* Minute Input */}
              <View style={styles.inputWrapper}>
                <Text>Minute (0-59):</Text>
                <TextInput
                  style={styles.inputBox}
                  keyboardType="numeric"
                  placeholder="Minute"
                  value={selectedMinute}
                  onChangeText={(text) => setSelectedMinute(text)}
                />
              </View>
            </View>


            {/* AM/PM Selection */}
            <Text>AM/PM:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollableOptions}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.option,
                    selectedPeriod === period && { backgroundColor: '#575788' },
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text style={[styles.optionText, selectedPeriod === period && { color: 'white' }]}>{period}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendNotification}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCloseModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
  headerContainer: {
    padding: 15,
    backgroundColor: '#575788',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
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
    backgroundColor: '#575788',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
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
  scrollableOptions: {
    marginVertical: 10,
  },
  option: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  optionText: {
    fontSize: 14,
  },
  inputBox: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#575788',
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
    backgroundColor: '#2C2C64',
    padding: 15,
    borderRadius: 5,
  },
  notificationText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row', // Places inputs side by side
    justifyContent: 'space-between', // Ensures even spacing
    width: '100%',
  },
  inputWrapper: {
    flex: 1, // Each input takes equal space
    marginHorizontal: 5, // Adds space between the two inputs
  },
  inputBox: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  }, 
  buttonRow: {
    flexDirection: 'row', // Align buttons side by side
    justifyContent: 'space-between', // Evenly distribute buttons
    marginTop: 15, // Add some space above the buttons
  },
  sendButton: {
    flex: 1, // Equal width for both buttons
    backgroundColor: '#575788',
    padding: 10,
    borderRadius: 5,
    marginRight: 5, // Space between the buttons
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1, // Equal width for both buttons
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5, // Space between the buttons
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
   
});

export default Calendar;