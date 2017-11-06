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
        "http://i1-news.softpedia-static.com/images/fitted/620x/screenshots-of-first-android-app-ported-to-windows-10-mobile-leaked-488772-3.jpg",
        "http://www.technologytell.com/gadgets/files/2012/07/rdio-for-android-screenshot-04.jpeg",
        "http://www.christianpeeters.com/wp-content/uploads/2012/08/gridviewtutorial1.png",
        "https://developer.xamarin.com/guides/android/deployment,_testing,_and_metrics/publishing_an_application/Images/google_play_app.png"
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
