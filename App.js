import React from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Fragment } from "react/cjs/react.production.min";
import CryptoList from "./app/CryptoList.jsx";

export default function App() {
  return (
    <Fragment>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <CryptoList />
      </SafeAreaView>
      <View style={{ flex: 0.1, backgroundColor: "blue" }} />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
