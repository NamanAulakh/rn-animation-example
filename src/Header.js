import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 1,
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
    position: 'absolute',
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: { color: 'white', fontWeight: 'bold', fontSize: 20 },
});
const IconWithBubble = ({ name, number, msg }) => (
  <TouchableOpacity onPress={() => Alert.alert(msg)}>
    <Icon name={name} size={size} />

    <View style={{ ...styles.bubbleCont, backgroundColor: blue }}>
      <Text style={styles.bubbleText}>{number}</Text>
    </View>
  </TouchableOpacity>
);
const size = 35;

export default () => (
  <View style={styles.container}>
    <TouchableOpacity style={{ flex: 1 }} onPress={() => Alert.alert('Back')}>
      <Icon name="angle-left" size={size + 10} color="black" />
    </TouchableOpacity>

    <View style={styles.rightIcons}>
      <TouchableOpacity onPress={() => Alert.alert('Search')}>
        <Icon name="search" size={size} color="black" />
      </TouchableOpacity>

      <IconWithBubble name="bell" number={3} msg="Notifications" />

      <IconWithBubble name="comment" number={5} msg="Messages" />
    </View>
  </View>
);
