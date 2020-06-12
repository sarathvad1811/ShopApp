import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { CommonActions } from "@react-navigation/native";

const ShoppingCartIcon = props => (
  <View
    style={[
      { padding: 5, marginRight: 8 },
      Platform.OS == "android" ? styles.iconContainer : null
    ]}
  >
    {/* {props.cartItems.length > 0 && ( */}
    <View
      style={{
        position: "absolute",
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: "#0000A0",
        right: 30,
        bottom: 25,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>
        {props.cartItems.length}
      </Text>
    </View>
    {/* )} */}
    <Icon onPress={props.onPress} name="ios-cart" size={30} />
  </View>
);

const mapStateToProps = state => {
  return {
    cartItems: state
  };
};

export default connect(mapStateToProps)(ShoppingCartIcon);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  iconContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    marginRight: 5
  }
});
