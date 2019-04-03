import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  cont: {
    borderTopWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    top: 380,
    // top: 80,
    width: '100%',
    zIndex: 3,
    position: 'absolute',
  },
  container: {
    height: 60,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3,
  },
  extra: {
    height: 15,
    width: 15,
    borderRadius: 20,
    backgroundColor: 'red',
    marginRight: 8,
  },
  commonTabCont: {
    paddingBottom: 200,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  commonTabText: {
    marginTop: height / 3,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});
/**
 * Reusable Components
 */
const Section = ({ heading, description, extra, index }) => {
  const headingStyles = {
    fontSize: 15,
    fontWeight: extra ? 'bold' : '100',
    color: index === 0 ? 'black' : 'rgba(162, 167, 172, 1)',
  };

  return (
    <View style={{ flex: 1, padding: 10, flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <Text style={headingStyles}>{heading}</Text>

        <Text style={{ color: 'rgba(108, 119, 130, 1)' }}>{description}</Text>
      </View>

      {extra && (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={styles.extra} />

          <Text>{extra}</Text>
        </View>
      )}
    </View>
  );
};
const GeneralSection = () => (
  <ScrollView
    contentContainerStyle={{
      paddingBottom: 1000,
      marginHorizontal: 5,
    }}
  >
    {generalSectionsArr.map((item, index) => (
      <Section {...item} index={index} key={index} />
    ))}
  </ScrollView>
);
const CommonTab = text => (
  <ScrollView contentContainerStyle={styles.commonTabCont}>
    <Text style={styles.commonTabText}>{text}</Text>
  </ScrollView>
);
/**
 * Data
 */
const generalSectionsArr = [
  { heading: '2016 Infiniti Q50', description: 'Space Grey', extra: 'PDI' },
  { heading: 'Stock Number', description: 'T3988' },
  { heading: 'VIN', description: 'T3988YUTYUTTT' },
  { heading: 'State', description: 'Stocked-in' },
  { heading: 'Recieved on', description: 'Aug 24, 2018' },
  { heading: 'Vehicle Type', description: 'New' },
  { heading: 'Age', description: '32 days' },
  { heading: 'Base Retail Price', description: '$200' },
];
const tabs = {
  General: GeneralSection,
  Pricing: CommonTab,
  Parts: CommonTab,
  Damages: CommonTab,
};

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 'General' };
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
        const { dy } = gestureState;
        const { _offset, _value } = animatedValueY;
        if (_value === 0 && dy > 0) return false;
        if (_value < 0 && dy < 0) return false;
        if (_offset * -1 === _value && dy > 0) return false;

        return true;
      },
      onPanResponderGrant: () => {
        this._animatedValue.setOffset({ x: this._value.x, y: this._value.y });
        this._animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this._animatedValue.x, dy: this._animatedValue.y },
      ]), // Creates a function to handle the movement and set offsets
      onPanResponderRelease: () => {
        const animatedValueY = this._animatedValue.y;
        if (animatedValueY._offset === 0) {
          if (animatedValueY._value < 0) this.goToTop();
        } else {
          if (animatedValueY._value > 0) this.goToStart();
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
        <View style={styles.container}>
          {Object.keys(tabs).map((key, index) => {
            const tabStyles = {
              flex: 1,
              paddingBottom: 15,
              borderBottomWidth: 5,
              borderBottomColor: activeTab === key ? blue : gray,
              zIndex: 3,
            };
            const tabTextStyles = {
              fontSize: 20,
              fontWeight: 'bold',
              color: activeTab === key ? blue : gray,
              alignSelf: 'center',
            };

            return (
              <TouchableOpacity
                key={index}
                style={tabStyles}
                onPress={() => this.setState({ activeTab: key })}
              >
                <Text style={tabTextStyles}>{key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {tabs[activeTab](activeTab)}
      </Animated.View>
    );
  }
}
