import React, { Component } from "react";
import {
  Animated,
  View,
  ListView,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  PanResponder
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class ScrollSwagger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: 0,
      ani: new Animated.Value(0),
      diff: 0,
      dataArray: undefined,
      noOfItems: undefined
    };
  }
  componentWillMount() {
    let count = this.props.itemCount;
    let arr = [];
    while (count > 0) {
      arr.push(count);
      count--;
    }
    this.setState({
      noOfItems: this.props.itemCount,
      dataArray: arr
    });
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onPanResponderMove: (dx, dy) => {
        if (
          this.state.diff > this.state.noOfItems * 100 &&
          dy.dy - this.state.scrollY > 0
        ) {
          // console.log("OverScrolling");
        } else if (this.state.diff < 0 && dy.dy - this.state.scrollY < 0) {
          // console.log("UnderScrolling");
        } else {
          this.setState({
            scrollY: dy.dy,
            diff: this.state.diff + (dy.dy - this.state.scrollY),
            ani: new Animated.Value(
              this.state.diff + (dy.dy - this.state.scrollY)
            )
          });
        }
        // console.log(this.state.diff, "diff");
      }, // Creates a function to handle the movement and set offsets
      onPanResponderRelease: (dx, dy) => {
        // console.log(dy);
        this.setState({
          scrollY: 0
        });
      }
    });
  }
  renderCards(index) {
    let scrollArray = [];
    let max = this.state.noOfItems * 100;
    scrollArray.push(max - 100 * index - 1);
    scrollArray.push(max - 100 * index);
    scrollArray.push(max - 100 * index + 100);
    scrollArray.push(max - 100 * index + 101);
    // console.log(index, scrollArray);
    let movFactor = this.state.ani.interpolate({
      inputRange: scrollArray,
      outputRange: [0, 0, 200, 200]
    });
    let scaleFactor = this.state.ani.interpolate({
      inputRange: scrollArray,
      outputRange: [1, 1, 1.05, 1.05]
    });
    return (
      <Animated.View
        key={index}
        {...this._panResponder.panHandlers}
        style={{
          height: 400,
          top: index * (height / (this.state.noOfItems * 5)),
          width: width - (this.state.noOfItems - index) * 10,
          position: "absolute",
          transform: [{ translateY: movFactor }, { scale: scaleFactor }]
        }}
      >
        {this.props.renderCard(index)}
      </Animated.View>
    );
  }
  render() {
    if (this.state.dataArray === undefined) {
      return <Text>loading</Text>;
    }
    return (
      <View
        style={[
          {
            flex: 1,
            height: height,
            width: width,
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 80
          },
          this.props.style ? this.props.style : null
        ]}
        {...this.props}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {this.state.dataArray.map((item, index) => {
            return this.renderCards(index);
          })}
        </View>
      </View>
    );
  }
}
