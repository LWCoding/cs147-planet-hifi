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

// Given a user id, asynchronously fetches the user's data from the database
// as well as their associated emotion. Return it.
export const findPlanetById = async (userId) => {
  const { data: userData, error: userError } = await db
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (userError) {
    console.error("Error fetching user: ", error.message);
  }
  const { data: statusData, error: statusError } = await db
    .from("statuses")
    .select("*")
    .eq("status_id", userData.current_status_id)
    .single();
  if (!statusError) {
    userData.emotion = statusData.emotion;
  }
  return userData;
};

// Given a user id, fetches the user's friends' ids (array)
export const fetchUserGalaxiesById = async (userId) => {
  const { data: galaxiesData, error: galaxiesError } = await db
    .from("galaxies")
    .select("*")
    .eq("creator_userid", userId)
    .order("created_at", { descending: true });
  if (galaxiesError) {
    console.error("Error fetching galaxies: ", error.message);
  }
  return galaxiesData;
};

// Fetches all planets from the database as well as their associated emotions
// and returns a list of them.
export const fetchAllPlanets = async () => {
  const { data: usersData, error: usersError } = await db
    .from("users")
    .select("*");

  if (usersError) {
    console.error("Error fetching users: " + usersError.message);
  }

  const { data: statusData, error: statusError } = await db
    .from("statuses")
    .select("*");

  if (statusError) {
    console.error("Error fetching statuses: " + statusError.message);
  }

  const usersInfo = usersData.map((user) => {
    // If the user has a status, then find the status
    if (user.current_status_id) {
      const status = statusData.find(
        (status) => status.user_id === user.user_id
      );
      user.emotion = status.emotion || "happy";
    }

    return user;
  });

  return usersInfo;
};

// Given a user id, asynchronously fetches all of the user's statuses from the database,
// even expired ones. Returns the statuses in a list.
export const fetchAllStatusesById = async (userId) => {
  const user = await findPlanetById(userId);

  const { data: statusData, error: statusError } = await db
    .from("statuses")
    .select("*")
    .eq("user_id", user.user_id);

  if (statusError) {
    console.error("Error fetching statuses: " + error.message);
  }

  return statusData;
};

// Given a galaxy id, fetches the galaxy
export const findGalaxyById = async (galaxyId) => {
  const { data: galaxiesData, error: galaxiesError } = await db
    .from("galaxies")
    .select("*")
    .eq("galaxy_id", galaxyId)
    .single();

  if (galaxiesError) {
    console.error("Error fetching galaxy: ", galaxiesError.message);
  }

  return galaxiesData;
};

// Given a status id, asynchronously fetches the status's data from the database
// and returns it.
export const findStatusById = async (statusId) => {
  const { data, error } = await db
    .from("statuses")
    .select("*")
    .eq("status_id", statusId)
    .single();

  if (error) {
    console.warn("Error fetching status: ", error.message);
  }

  return data;
};

// Given a user id, asynchronously fetches the user's associated calendar information
// from the database and returns it.
export const findCalendarInfoById = async (userId) => {
  const { data, error } = await db
    .from("availabilities")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching calendar info: ", error.message);
  }

  return data;
};

// Given a user id, asynchronously fetches the user's galaxy names from the database
// and returns them in a list.
export const getAllGalaxyNamesById = async (userId) => {
  let { data, error } = await db
    .from("galaxies")
    .select("*")
    .eq("creator_userid", userId);

  data = data.map((galaxy) => galaxy.name);

  if (error) {
    console.error("Error fetching galaxy names: ", error.message);
  }

  return data;
};

export const fetchFriendsForUserId = async (userId) => {
  // Get user
  const user = await findPlanetById(userId);

  // Get logged in user's friend ids
  const friendIds = user["friend_ids"];

  // find friends' planets
  const allPlanets = await fetchAllPlanets();
  let friendsPlanets = friendIds.map((friendId) =>
    allPlanets.find((user) => user.user_id === friendId)
  );
  friendsPlanets = friendsPlanets.filter((friend) => {
    return friend !== undefined;
  });

  return friendsPlanets;
};

export const fetchFriendsForGalaxyId = async (galaxyId) => {
  const galaxy = await findGalaxyById(galaxyId);

  const friendIds = galaxy["planets"];

  // If no friends found, return empty list
  if (friendIds == null) {
    return [];
  }

  const allPlanets = await fetchAllPlanets();
  let friendsPlanets = friendIds.map((friendId) =>
    allPlanets.find((user) => user.user_id === friendId)
  );

  return friendsPlanets;
};

export default db;
