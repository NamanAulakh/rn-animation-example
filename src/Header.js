import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
const size = 35;
const IconWithBubble = ({ name, number }) => (
  <View>
    <Icon name={name} size={size} />

    <View style={styles.bubbleCont}>
      <Text style={styles.bubbleText}>{number}</Text>
    </View>
  </View>
);

export default () => (
  <View style={styles.container}>
    <View style={{ flex: 1 }}>
      <Icon name="angle-left" size={size + 10} color="black" />
    </View>

    <View style={styles.rightIcons}>
      <Icon name="search" size={size} color="black" />

      <IconWithBubble name="bell" number={3} />

      <IconWithBubble name="comment" number={5} />
    </View>
  </View>
);
