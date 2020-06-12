import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { sizes } from "../constants/Theme";
import { items } from "../data";
import { connect } from "react-redux";

class CartScreen extends React.Component {
  goToItem = (_id, _quantity) => {
    let _items = [];
    _items = items.filter(item => item.id === _id);
    _items[0].quantity = _quantity;
    this.props.navigation.navigate("ItemDetails", {
      item: _items[0],
      msg: "Update"
    });
  };

  render() {
    const { cartItems, removeItem } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {!cartItems || cartItems.length === 0 ? (
          <Text
            style={{
              fontSize: sizes.title,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 10
            }}
          >
            No items in the cart
          </Text>
        ) : null}

        <ScrollView>
          {cartItems &&
            cartItems.map(item => {
              return (
                <View key={item.id} style={styles.cartItems}>
                  <Image style={styles.image} source={item.image} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                      {item.name.slice(0, 10)}...
                    </Text>
                    <Text style={styles.title}>Rs. {item.price}</Text>
                  </View>
                  <Icon
                    name="ios-trash"
                    size={30}
                    style={{
                      marginRight: 10,
                      textAlign: "right"
                    }}
                    onPress={() => removeItem({ id: item.id })}
                  />
                </View>
              );
            })}
        </ScrollView>
        <View
          style={{
            borderTopWidth: 1,
            paddingTop: 10,
            borderTopColor: "#BBBBBB",
            paddingHorizontal: 20,
            paddingBottom: 10
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            Total: Rs.{" "}
            {cartItems &&
              cartItems.reduce((count, curItem) => {
                return count + curItem.price * curItem.quantity;
              }, 0)}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            Total Quantity:{" "}
            {cartItems &&
              cartItems.reduce((count, curItem) => {
                return count + (curItem.quantity || 0);
              }, 0)}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: product =>
      dispatch({ type: "REMOVE_FROM_CART", payload: product })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingHorizontal: sizes.padding
  },
  text: {
    paddingHorizontal: sizes.padding
  },
  image: {
    width: 80,
    height: 80
  },
  cartItems: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20
  }
});
