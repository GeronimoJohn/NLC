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

export default function Program() {
  const [isLoading, setIsLoading] = useState(true);
  const [day, setDay] = useState();
  const [sessions, setSessions] = useState([]);

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
          console.log(data);
          setDay(data.nlc.day);
          setSessions(data.nlc.sessions);
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
          <Text style={styles.title}>{day}</Text>
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <FlatList
            data={sessions}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.movieText}>{item}</Text>
              </View>
            )}
          />
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
