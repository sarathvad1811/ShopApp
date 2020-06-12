import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/homescreen";
import CartScreen from "../screens/cartscreen";

export default class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppStackNavigator.Navigator>
          <AppStackNavigator.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "ShoppingApp" }}
          />
          <AppStackNavigator.Screen name="Cart" component={CartScreen} />
        </AppStackNavigator.Navigator>
      </NavigationContainer>
    );
  }
}

const AppStackNavigator = createStackNavigator();
