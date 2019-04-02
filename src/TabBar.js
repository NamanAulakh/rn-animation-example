import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

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
    return (
      <View style={{ backgroundColor: 'green' }}>
        <Options setActiveTab={this.setActiveTab} />
      </View>
    );
  }
}
