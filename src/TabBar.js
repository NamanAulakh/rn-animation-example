import React, { Component } from 'react';
import clamp from 'clamp';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
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
      paddingBottom: 200,
      marginHorizontal: 5,
      zIndex: 3,
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
  { heading: 'Dummy Section', description: 'Dummy Description' },
  { heading: 'Dummy Section', description: 'Dummy Description' },
  { heading: 'Dummy Section', description: 'Dummy Description' },
  { heading: 'Dummy Section', description: 'Dummy Description' },
  { heading: 'Dummy Section', description: 'Dummy Description' },
  { heading: 'Dummy Section', description: 'Dummy Description' },
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
    this._animatedValue = new Animated.ValueXY();
    this._value = { x: 0, y: 0 };
    // not sure what's this
    this._animatedValue.addListener(value => (this._value = value));

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this._animatedValue.setOffset({ x: this._value.x, y: this._value.y });
        this._animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this._animatedValue.x, dy: this._animatedValue.y },
      ]), // Creates a function to handle the movement and set offsets
      onPanResponderRelease: e => {
        const animatedValueY = this._animatedValue.y;
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@', animatedValueY);
        if (animatedValueY._offset === 0) {
          if (animatedValueY._value < 0) {
            console.log('goToTop');
            Animated.timing(animatedValueY, {
              toValue: -1 * height + 366,
              duration: 100,
            }).start();
          }
        } else {
          console.log('else');
          if (animatedValueY._value > 0) {
            console.log('goToBottom');
            Animated.timing(animatedValueY, {
              toValue: -1 * animatedValueY._offset,
              duration: 100,
            }).start();
          }
        }
      },
    });
  };

  render() {
    const { activeTab } = this.state;

    return (
      // <TouchableOpacity style={styles.cont} onPress={onPress}>
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
