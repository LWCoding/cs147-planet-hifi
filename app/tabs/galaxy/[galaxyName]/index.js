//SORRY LUCAS i let u down king i genuinely dont know what im doing atp lmao
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { fetchUsersGalaxies } from "@/database/db"; // Fetch list of galaxies

export default function GalaxyPage() {
  const { galaxyName: testtest } = useLocalSearchParams();
  const router = useRouter();
  const [galaxies, setGalaxies] = useState([]);
  const [currentGalaxyIndex, setCurrentGalaxyIndex] = useState(0);

  // Fetch all galaxies and set the current galaxy index based on the galaxy name
  useEffect(() => {
    console.log("hi");
    console.log("Galaxy Name from params:", testtest);
    // console.log("hello");
    // if (!galaxyName) {
    //   console.log("No galaxy name available from route");
    //   return;
    // }
    // console.log("hi");

    // console.log("galaxyName:", galaxyName);
    // const loadGalaxies = async () => {
    //   const galaxyList = await fetchUsersGalaxies(userId); // Get all galaxies from DB
    //   setGalaxies(galaxyList);

    //   // Find the index of the current galaxy name
    //   const index = galaxyList.findIndex((g) => g.name === galaxyName);
    //   console.log(index);
    //   if (index !== -1) {
    //     setCurrentGalaxyIndex(index);
    //   }
    // };

    // loadGalaxies();
  }, []);

  const navigateToGalaxy = (newIndex) => {
    const nextGalaxy = galaxies[newIndex].name;
    if (nextGalaxy) {
      router.push(`/tabs/galaxy/${nextGalaxy}`);
    }
  };

  const handlePreviousGalaxy = () => {
    const previousIndex =
      (currentGalaxyIndex - 1 + galaxies.length) % galaxies.length;
    navigateToGalaxy(previousIndex);
  };

  const handleNextGalaxy = () => {
    const nextIndex = (currentGalaxyIndex + 1) % galaxies.length;
    navigateToGalaxy(nextIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galaxy: {galaxyName}</Text>

      <View style={styles.buttonRow}>
        <Button title="Previous Galaxy" onPress={handlePreviousGalaxy} />
        <Button title="Next Galaxy" onPress={handleNextGalaxy} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
