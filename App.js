import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";

const query = `
  query {
  nlc(id: "2V5E5Z8bPLgrR4sOiUOJ7E") {
    day
    sessions
    test
  }
}
`;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [description, setDescription] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    async function fetchContentfulApi() {
      window
        .fetch(
          "https://graphql.contentful.com/content/v1/spaces/77f867d92inh?access_token=AhTMGjIGx1nflRAs-lxRR0bcD-osLEk-DQqKeIKLqJs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        )
        .then((response) => response.json())
        .then(({ data, errors }) => {
          if (errors) {
            console.log(errors);
          }
          // console.log the data
          console.log(data.nlc.day);
          setData(data);
          setIsLoading(false);
        });
    }

    fetchContentfulApi();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.title}>{data.nlc.day}</Text>
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          {/* <FlatList
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
        </View>
      )}
    </SafeAreaView>
  );
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
