import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { UserContext } from "@/contexts/UserContext";
import { useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import db from "@/database/db";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserId } = useContext(UserContext);

  const router = useRouter();
  const theme = useTheme();

  const signIn = async () => {
    // This email validation is super insecure, but I'm not considering serious authentication -Lucas
    setLoading(true); // Prevent user from submitting another request until done

    try {
      // Try to get the user that matches the info provided
      const { data, error } = await db
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      // Heuristic something: make errors clear so user can recover 🤓
      if (!data) {
        Alert.alert("Provided username or password is incorrect");
        return;
      }

      // If all else fails, give general error message
      if (error) {
        Alert.alert(error.message);
        return;
      }

      // If we've found the user, navigate to their galaxy
      setUserId(data.user_id); // Store the user's id
      router.navigate("tabs/galaxy");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Allow user to submit another request
    }
  };

  const isSignInDisabled =
    loading || email.length === 0 || password.length === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.splash}>
        <MaterialCommunityIcons
          size={64}
          name="orbit"
          color={theme.colors.primary}
        />
        <Text style={styles.splashText}>Planet</Text>
      </View>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={"none"}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize={"none"}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={() => signIn()} disabled={isSignInDisabled}>
          <Text
            style={[
              styles.button,
              isSignInDisabled ? styles.buttonDisabled : undefined,
            ]}
          >
            Sign in
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 140,
    padding: 20,
    flex: 1,
  },
  splash: {
    alignItems: "center",
    marginBottom: 12,
  },
  splashText: {
    fontFamily: "PPPierSans-Regular",
    fontWeight: "bold",
    fontSize: 60,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  verticallySpaced: {
    marginVertical: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    width: "100%",
    padding: 16,
  },
  button: {
    fontSize: 18,
    fontWeight: 18,
    padding: 8,
    fontFamily: "PPPierSans-Regular",
  },
});
