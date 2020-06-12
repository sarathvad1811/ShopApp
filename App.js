import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigator/appnavigation";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
