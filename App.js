import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ProgressBarAndroidComponent,
  MaskedViewComponent,
} from "react-native";

import data from "./Data/FakeData";
const movieUrl = "https://reactnative.dev/movies.json";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [description, setDescription] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    async function fetchJsonAPI() {
      fetch(movieUrl)
        .then((response) => response.json())
        .then((json) => {
          setTitle(json.title);
          setMovies(json.movies);
          setDescription(json.description);
        })
        .catch((error) => alert(error))
        .finally(() => setIsLoading(false));
    }

    fetchJsonAPI();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* <Text style={styles.title}>{title}</Text>
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <FlatList
            data={movies}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.movieText}>
                  {item.id}. {item.title}
                  {item.releaseYear}
                </Text>
              </View>
            )}
          />
          <Text style={styles.description}>{description}</Text> */}
          <Text style={styles.title}>CCF 2021 DLA Program Flow</Text>
            {data.program.days.events.map((event, i) => {
              if (event.startTime < 1200) {
                return <Text key={i}>{event.event}: {convert(event.startTime)}</Text>
              }
            })}

        </View>
      )}
    </SafeAreaView>
  );
}


function convert(timeInput) {
  let hours24 = parseInt(timeInput.substring(0, 2), 10);
  let hours = ((hours24+11) %12) + 1;
  let amPm = hours24 > 11 ? 'pm' : 'am';
  var minutes = timeInput.substring(2);

  return hours + ":" + minutes + amPm
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  movieText: {
    fontSize: 26,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    color: "green",
  },
});
