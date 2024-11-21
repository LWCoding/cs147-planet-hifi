import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import db from "@/database/db";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const theme = useTheme();

  const signInWithEmail = async () => {
    // For now, skip worrying about email validation
    router.navigate("tabs/galaxy");
    return;

    setLoading(true);
    try {
      const { data, error } = await db.auth.signInWithPassword({
        username: "Test User",
        email: email,
        password: password,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        Alert.alert(error.message);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
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
        <Button onPress={() => signInWithEmail()} disabled={isSignInDisabled}>
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
    paddingTop: 60,
    padding: 12,
    flex: 1,
  },
  splash: {
    alignItems: "center",
    marginBottom: 12,
  },
  splashText: {
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
  },
});
