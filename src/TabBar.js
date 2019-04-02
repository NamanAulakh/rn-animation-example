import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: blue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
const tabsArr = ['General', 'Pricing', 'Parts', 'Damages'];
const Options = ({ setActiveTab }) => {
  return (
    <View>
      <Text>Yo</Text>
    </View>
  );
};

export default class TabBar extends Component {
  state = { activeTab: 0 };

  setActiveTab = activeTab => this.setState({ activeTab });

  render() {
    const { activeTab } = this.state;

    return (
      <View style={{ backgroundColor: 'white' }}>
        <View
          style={{
            // backgroundColor: 'green',
            height: 60,
            marginTop: 20,
            marginBottom: 20,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
          }}
        >
          {tabsArr.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                // backgroundColor: 'yellow',
                flex: 1,
                paddingBottom: 15,
                borderBottomWidth: 5,
                borderBottomColor: activeTab === index ? blue : gray,
              }}
              onPress={() => this.setState({ activeTab: index })}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: activeTab === index ? blue : gray,
                  // alignSelf: 'center',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Options setActiveTab={this.setActiveTab} />
      </View>
    );
  }
}
