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
      diff: 0,
      dataArray: undefined,
      noOfItems: undefined,
      ani: new Animated.Value(0)
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
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (e, gestureState) => {
        const { dx, dy } = gestureState;

        return Math.abs(dx) > 1 || Math.abs(dy) > 1;
      },
      onPanResponderMove: (dx, dy) => {
        // console.log(this.state.diff, this.state.noOfItems * 100);
        if (
          this.state.diff > this.state.noOfItems * 120 + 30 &&
          dy.dy - this.state.scrollY > 0
        ) {
          // console.log("OverScrolling");
        } else if (this.state.diff < 0 && dy.dy - this.state.scrollY < 0) {
          // console.log("UnderScrolling");
        } else {
          this.setState({
            scrollY: dy.dy,
            diff: this.state.diff + (dy.dy - this.state.scrollY)
          });
          const ani = this.state.ani;
          ani.setValue(this.state.diff);
          this.setState({
            ani: ani
          });
        }
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
    let max = this.state.noOfItems * 120;
    scrollArray.push(max - 120 * index - 1);
    scrollArray.push(max - 120 * index);
    scrollArray.push(max - 120 * index + 200);
    scrollArray.push(max - 120 * index + 201);
    let top = 0;
    let widFac = 1;
    switch (index) {
      case this.state.noOfItems - 1:
        top = 150;
        widFac = 1.04;
        break;
      case this.state.noOfItems - 2:
        top = 100;
        widFac = 1.03;
        break;
      case this.state.noOfItems - 3:
        top = 50;
        widFac = 1.02;
        break;
      case 0:
        top = 10;
        widFac = 0.98;
        break;
      case 1:
        top = 20;
        widFac = 1;
        break;
      case 2:
        top = 30;
        widFac = 1.01;
        break;
      case 3:
        top = 40;
        widFac = 1.015;
        break;
      default:
        top = 50;
        widFac = 1.02;
    }
    let movFactor = this.state.ani.interpolate({
      inputRange: scrollArray,
      outputRange: [0, 0, 800, 800]
    });
    let scaleFactor = this.state.ani.interpolate({
      inputRange: scrollArray,
      outputRange: [1, 1, 1.1, 1.1]
    });
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        key={index}
        style={{
          top: top,
          width: width - 30,
          position: "absolute",
          transform: [
            { translateY: movFactor },
            { scale: scaleFactor },
            { scaleX: widFac }
          ]
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
            paddingTop: 70,
            backgroundColor: "black"
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
