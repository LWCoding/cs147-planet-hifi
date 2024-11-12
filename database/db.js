import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hnvqcshxhhmrbidxombp.supabase.co";

// This is technically insecure but I'm hoping nobody hacks us - Lucas
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhudnFjc2h4aGhtcmJpZHhvbWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MTE3MDgsImV4cCI6MjA0NjI4NzcwOH0.wD6F3LEQtdKp48F9Td49I9LTC5o9B-ZXGM4Rkmg-KDM";

const db = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    db.auth.startAutoRefresh();
  } else {
    db.auth.stopAutoRefresh();
  }
});

export default db;
