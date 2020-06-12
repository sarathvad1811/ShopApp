import React from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import StarRating from "react-native-star-rating";
import { sizes } from "../constants/Theme";
import { connect } from "react-redux";
import cartItems from "../reducers/cartItems";

const { width, height } = Dimensions.get("window");

class ItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {
        id: this.props.route.params.item.id,
        name: this.props.route.params.item.name,
        image: this.props.route.params.item.imgPath,
        gallery: this.props.route.params.item.gallery,
        price: this.props.route.params.item.price,
        rating: this.props.route.params.item.rating,
        desc: this.props.route.params.item.desc,
        quantity: 1
      }
    };
  }

  render() {
    const {
      id,
      image,
      gallery,
      price,
      rating,
      desc,
      sold,
      quantity
    } = this.state.currentItem;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#808080" }}>
        <ScrollView>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={8}
            snapToAlignment="center"
            data={gallery}
            extraDate={this.state}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item }) => (
              <Image
                source={item.imgPath}
                resizeMode="contain"
                style={{ width, height: height / 2, overflow: "visible" }}
              />
            )}
            onScroll={Animated.event([
              {
                nativeEvent: { contentOffset: { x: this.scrollX } }
              }
            ])}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: 30,
                backgroundColor: "#fff",
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>Scroll to view other images</Text>
            </View>
            <View style={{ height: 170, backgroundColor: "#fff" }}>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: sizes.h3,
                    fontWeight: "700",
                    paddingHorizontal: sizes.padding,
                    marginTop: sizes.margin
                  }}
                >
                  Rs {price}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      top: 22,
                      left: 22,
                      paddingRight: sizes.padding - 15
                    }}
                  >
                    <StarRating
                      disable={true}
                      maxStars={1}
                      rating={rating}
                      starSize={13}
                      fullStarColor="#C5CCD6"
                    ></StarRating>
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: "right",
                        fontSize: sizes.paragraph,
                        paddingHorizontal: sizes.padding,
                        marginTop: sizes.margin,
                        color: "#C5CCD6"
                      }}
                    >
                      {rating}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: sizes.margin - 5 }}>
                <Text style={{ paddingHorizontal: sizes.padding }}>{desc}</Text>
              </View>
            </View>
            <View
              style={{
                height: 250,
                backgroundColor: "#fff",
                marginTop: sizes.margin
              }}
            >
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    fontSize: sizes.h3,
                    fontWeight: "700",
                    paddingHorizontal: sizes.padding,
                    marginTop: sizes.margin
                  }}
                >
                  Customer Reviews
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-start"
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: sizes.paragraph,
                        paddingHorizontal: sizes.padding,
                        marginTop: sizes.margin - 5
                      }}
                    >
                      {rating}
                    </Text>
                  </View>
                  <View
                    style={{
                      fontSize: sizes.paragraph,
                      marginTop: sizes.margin - 3,
                      marginLeft: 0
                    }}
                  >
                    <StarRating
                      disable={true}
                      maxStars={5}
                      rating={rating}
                      starSize={13}
                    ></StarRating>
                  </View>
                </View>
                <View style={{ marginTop: sizes.margin - 4 }}>
                  <Text
                    style={{
                      fontSize: sizes.text,
                      paddingHorizontal: sizes.padding,
                      color: "#C5CCD6"
                    }}
                  >
                    John Doe ({rating})
                  </Text>
                  <Text
                    style={{
                      fontSize: sizes.text,
                      paddingHorizontal: sizes.padding,
                      marginTop: sizes.margin - 5
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec dapibus diam sed bibendum accumsan. Vivamus ligula
                    lorem, commodo nec pretium vel.
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: sizes.margin
              }}
            >
              <View style={{ backgroundColor: "red" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.addItemToCart(this.state.currentItem);
                  }}
                  disabled={
                    this.props.isAlreadyInCart ||
                    this.state.currentItem.quantity >= 1
                      ? false
                      : true
                  }
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: sizes.h3,
                      color: "#fff",
                      paddingTop: sizes.padding - 10,
                      paddingBottom: sizes.padding - 10
                    }}
                  >
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const cartIndex = state.cartItems.findIndex(
    cartItem => ownProps.id == cartItem.id
  );
  return {
    isAlreadyInCart: cartIndex != -1 ? true : false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product =>
      dispatch({ type: "ADD_TO_CART", payload: product })
  };
};

export default connect(null, mapDispatchToProps)(ItemScreen);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  dateTime: {
    paddingTop: 20
  },
  generalCart: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 15
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "center"
  },
  quantityText: {
    flex: 1,
    flexDirection: "row"
  },
  input: {
    height: 40,
    width: 50,
    borderWidth: 1,
    borderColor: "rgba(27,31,35,0.05)",
    padding: 10,
    backgroundColor: "rgba(27,31,35,0.05)"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#05a5d1",
    padding: 10,
    width: 150,
    height: 40
  },
  buttonDisable: {
    backgroundColor: "#cccccc",
    color: "#666666",
    alignItems: "center",
    padding: 10,
    width: 150,
    height: 40,
    marginLeft: 20,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17
  },
  decreaseButton: {
    height: 30,
    width: 30,
    backgroundColor: "rgba(27,31,35,0.05)"
  },
  increaseButton: {
    height: 30,
    width: 30,
    backgroundColor: "rgba(27,31,35,0.05)"
  }
});
