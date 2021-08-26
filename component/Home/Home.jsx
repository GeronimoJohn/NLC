import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";

const query = `
query {
  ndcAboutPageCollection {
    items {
      title
      about
      image {
        url
      }
    }
  }
}
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentfulData, setContentfulData] = useState(true);

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
          setContentfulData(data.ndcAboutPageCollection.items);
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
              <Image style={styles.tinyLogo} source={data.image.url} />
              <Text key={i}>{data.title}</Text>
              <Text>{data.about}</Text>
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
  tinyLogo: {
    width: 200,
    height: 250,
  },
});
