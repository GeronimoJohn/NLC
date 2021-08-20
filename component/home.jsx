import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome to CCF</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
});
