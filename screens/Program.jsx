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
  nlcCollection(order: title_DESC) {
   	items {
      title
      sessions
    }
  }
}
`;

export default function Program() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentfulData, setContentfulData] = useState();

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
          console.log(data);
          setContentfulData(data.nlcCollection.items);
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
          {contentfulData.map((data, i) => (
            <>
              <Text style={styles.title}>{data.title}</Text>
              <View style={{ borderBottomWidth: 1, marginBottom: 12 }} />
              <FlatList
                data={data.sessions}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, i }) => (
                  <View style={{ paddingBottom: 10 }} key={i}>
                    <Text style={styles.movieText}>{item}</Text>
                  </View>
                )}
              />
            </>
          ))}
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
