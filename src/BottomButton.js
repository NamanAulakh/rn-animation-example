import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  rightIcons: {
    flex: 1,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bubbleCont: {
    height: 25,
    width: 25,
    borderRadius: 20,
    backgroundColor: 'blue',
    position: 'absolute',
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: { color: 'white', fontWeight: 'bold', fontSize: 20 },
});

export default ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 80,
      width: '100%',
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    }}
  >
    <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
      Create RO
    </Text>
  </TouchableOpacity>
);
