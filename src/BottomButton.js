import React, { Component } from "react";
import {
  PanResponder,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 4,
  },
});

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.setup();
  }

  setup = () => {
    const { setRef } = this.props;
    setRef(this);
    this._animatedValue = new Animated.ValueXY();
    this._value = { x: 0, y: 0 };
    this._animatedValue.addListener((value) => {
      this._value = value;
    });
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderMove: Animated.event(
        [null, { dx: this._animatedValue.x, dy: this._animatedValue.y }],
        { useNativeDriver: false }
      ),
    });
  };

  goToBottom = () =>
    Animated.timing(this._animatedValue.y, {
      toValue: height,
      duration: 1000,
      useNativeDriver: false,
    }).start();

  goToStart = () =>
    Animated.timing(this._animatedValue.y, {
      toValue: -1 * this._animatedValue.y._offset,
      duration: 300,
      useNativeDriver: false,
    }).start();

  render() {
    const { onPress } = this.props;
    const buttonStyles = { ...styles.container, backgroundColor: blue };

    return (
      <Animated.View
        style={{
          ...buttonStyles,
          transform: [{ translateY: this._animatedValue.y }],
        }}
        {...this._panResponder.panHandlers}
      >
        <TouchableOpacity onPress={onPress} style={buttonStyles}>
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
            Create RO
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
