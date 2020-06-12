import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/homescreen";
import CartScreen from "../screens/cartscreen";
import HeaderIcon from "../components/headerIcon";

const AppStackNavigator = createStackNavigator();

export default class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppStackNavigator.Navigator>
          <AppStackNavigator.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Let's Shop",
              headerRight: () => (
                <HeaderIcon onPress={() => navigation.navigate("Cart")} />
              )
            })}
          />
          <AppStackNavigator.Screen name="Cart" component={CartScreen} />
        </AppStackNavigator.Navigator>
      </NavigationContainer>
    );
  }
}
