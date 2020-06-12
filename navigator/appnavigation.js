import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/homescreen";
import CartScreen from "../screens/cartscreen";
import ItemScreen from "../screens/itemscreen";
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
          <AppStackNavigator.Screen
            name="Item"
            component={ItemScreen}
            options={({ route }) => ({
              title: route.params.item.name,
              headerBackTitle: "Back",
              headerStyle: { backgroundColor: "#33CEFF", height: 90 },
              headerTintColor: "#fff"
            })}
          />
        </AppStackNavigator.Navigator>
      </NavigationContainer>
    );
  }
}
