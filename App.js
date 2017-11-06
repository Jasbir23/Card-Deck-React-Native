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
        "https://assets.materialup.com/uploads/a1cd3599-9743-4ae9-b7fc-702a68ba38fc/attachment.jpg",
        "http://i1-news.softpedia-static.com/images/news2/Inbox-by-Gmail-App-for-Android-Screenshot-Tour-463990-3.jpg",
        "https://cdn.guidingtech.com/media/assets/WordPress-Import/2016/12/Screenshot_20161222-113306.jpg",
        "https://cdn.guidingtech.com/media/assets/WordPress-Import/2016/12/Screenshot_20161222-145225.png"
      ]
    };
  }
  render() {
    return (
      <CardDeck
        itemCount={this.state.itemCount}
        renderCard={index => {
          var pointer = index % 4;
          return (
            <TouchableOpacity
              onPress={() => console.log("Clicked at index " + index)}
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
