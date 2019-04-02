import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: blue,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    bottom: 40,
    left: '38%',
  },
});

export default ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Icon name="times" size={50} color="white" />
  </TouchableOpacity>
);
