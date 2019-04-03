import React, { Component } from 'react';
import { PanResponder, Animated, View, ScrollView } from 'react-native';
import { styles, tabs, height, width } from './constants';
import TabHeader from './TabHeader';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
    this.setup();
  }

  setActiveTab = activeTab => this.setState({ activeTab });

  setup = () => {
    const { setRef } = this.props;
    setRef(this);
    this._animatedValue = new Animated.ValueXY();
    this._value = { x: 0, y: 0 };
    this._animatedValue.addListener(value => {
      this._value = value;
    });
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        const animatedValueY = this._animatedValue.y;
        const { dy, moveY } = gestureState;
        const { _offset, _value } = animatedValueY;
        if (_value === 0 && dy > 0) return false;
        if (_value < 0 && dy < 0) return false;
        if (_value < 0 && dy > 0 && moveY > 180) return false;
        if (Math.abs(_offset) === _value && dy > 0) return false;

        return true;
      },
      onPanResponderGrant: () => {
        this._animatedValue.setOffset({ x: this._value.x, y: this._value.y });
        this._animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this._animatedValue.x, dy: this._animatedValue.y },
      ]),
      onPanResponderRelease: () => {
        const { _offset, _value } = this._animatedValue.y;
        if (_offset === 0) {
          if (_value < 0) {
            this.goToTop();
          } else {
            this.goToStart();
          }
        } else {
          this.goToStart();
        }
      },
    });
  };

  goToTop = () =>
    Animated.timing(this._animatedValue.y, {
      toValue: -1 * height + 366,
      duration: 400,
    }).start();

  goToBottom = () =>
    Animated.timing(this._animatedValue.y, {
      toValue: height,
      duration: 400,
    }).start();

  goToStart = () =>
    Animated.timing(this._animatedValue.y, {
      toValue: -1 * this._animatedValue.y._offset,
      duration: 400,
    }).start();

  render() {
    const { activeTab } = this.state;

    return (
      <Animated.View
        style={{
          ...styles.cont,
          transform: [{ translateY: this._animatedValue.y }],
        }}
        {...this._panResponder.panHandlers}
      >
        <TabHeader activeTab={activeTab} onPress={activeTab => this.setState({ activeTab })} />

        <View style={{ height, width }}>
          <ScrollView
            horizontal
            pagingEnabled
            style={{ height, width }}
            onScrollEndDrag={event => {
              const scrolledLength = event.nativeEvent.targetContentOffset.x;
              const activeTab = scrolledLength / width;
              this.setState({ activeTab });
            }}
          >
            {tabs.map(({ Component }, index) => (
              <Component key={index} />
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    );
  }
}
