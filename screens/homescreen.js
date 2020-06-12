import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { items } from "../data";
import Item from "../components/item";

const { width, height } = Dimensions.get("window");

class HomeScreen extends Component {
  renderItem = item => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity onPress={() => navigation.navigate("Item", { item })}>
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          <Item
            imgSrc={item.imgPath}
            width={width}
            name={item.name}
            price={item.price}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView contentContainerStyle={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
        <Text>Hi</Text>
      </SafeAreaView>
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // padding: 10
  }
});
