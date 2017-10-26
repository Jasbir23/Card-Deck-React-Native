import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import CardDeck from "./src/CardDeck";
const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 15,
      images: [
        "http://cdn.droidviews.com/wp-content/uploads/2016/09/iOS10_wall_droidviews_023.jpg",
        "http://www.wallpaperawesome.com/wallpapers-awesome/wallpapers-iphone-7-full-hd-1080-1920-awesome/wallpaper-iphone-7-kites-1080-1920-full-hd-389.jpg",
        "http://cdn.droidviews.com/wp-content/uploads/2016/09/iOS10_wall_droidviews_002.jpg",
        "https://i.pinimg.com/736x/0c/56/e6/0c56e65be513a9bcaae705a45c259cbb--screen-wallpaper-iphone--wallpaper-phone-wallpapers.jpg"
      ]
    };
  }
  render() {
    return (
      <CardDeck
        itemCount={this.state.itemCount}
        renderCard={index => {
          var pointer = index % 3;
          return (
            <TouchableOpacity
              style={{
                height: 500,
                width: width - 60,
                alignSelf: "center"
              }}
            >
              <Image
                style={{
                  height: 500,
                  width: width - 60,
                  position: "absolute",
                  top: 0
                }}
                source={{
                  uri: this.state.images[pointer]
                }}
              />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  width: width - 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "blue",
                  backgroundColor: "black"
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  Header
                </Text>
              </View>
            </TouchableOpacity>
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
