import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

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

export default ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
      Create RO
    </Text>
  </TouchableOpacity>
);
