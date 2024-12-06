import { StatusBar } from "expo-status-bar";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";

// Import components
import Planet from "@/components/Planet";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import db, { findPlanetById } from "@/database/db";

export default function Account() {
  const theme = useTheme();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isSaving, setIsSaving] = useState(false);

  const { userId } = useContext(UserContext);

  const fetchUserInfo = async () => {
    const user = await findPlanetById(userId);
    setUser(user);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setUsername(user.username);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Update the current user's information
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { error } = await db
        .from("users")
        .update({ first_name: firstName, last_name: lastName })
        .eq("user_id", userId);

      if (error) {
        console.error("Error updating user", error);
        Alert.alert("Error updating user information", error.message);
      } else {
        Alert.alert("Success", "User information updated successfully");
      }
    } catch (err) {
      console.error("Unexpected error", err);
      Alert.alert("Unexpected Error", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Double-check that the user actually wants to log out
  const handleLogoutPress = () => {
    Alert.alert(
      "Are you sure?", // Title of the alert
      "Logging out will send you back to the login screen.", // Message to display
      [
        {
          text: "Cancel",
        },
        {
          text: "Yes",
          isPreferred: true,
          onPress: () => router.navigate("/"),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View marginTop={10}>
        <Planet
          width={150}
          height={150}
          planet={user}
          isClickable={false}
          isNameVisible={false}
        />
      </View>
      <View margin={10}>
        <Text style={[styles.label]}>Username (you cannot change this)</Text>
        <TextInput value={username} disabled={true} />
      </View>
      <View margin={10}>
        <Text style={[styles.label]}>First Name</Text>
        <TextInput
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View margin={10}>
        <Text style={[styles.label]}>Last Name</Text>
        <TextInput
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View margin={10}>
        <Button
          onPress={handleSave}
          icon="content-save"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.text}
          mode="contained"
          disabled={isSaving}
        >
          Save
        </Button>
      </View>
      <View margin={10}>
        <TouchableOpacity onPress={handleLogoutPress}>
          <Text style={[styles.logoutText]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutText: {
    color: "red", // theme.colors.error and theme.colors.errorContainer are kind of ugly
    textAlign: "center",
    textDecorationLine: "underline",
    fontFamily: "PPPierSans-Regular",
  },
  label: {
    fontFamily: "PPPierSans-Regular",
    paddingBottom: 8,
  },
});
