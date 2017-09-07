import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import CardDeck from "./src/CardDeck";
const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 10
    };
  }
  render() {
    return (
      <CardDeck
        itemCount={this.state.itemCount}
        renderCard={index => {
          return (
            <TouchableOpacity
              style={{
                height: 400,
                backgroundColor: "pink",
                width: width - (this.state.itemCount - index) * 8,
                borderWidth: 2,
                alignSelf: "center"
              }}
            />
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
