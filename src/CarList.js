import React, { Component } from 'react';
import {
  Image,
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
  bubbleText: { color: 'white', fontWeight: 'bold', fontSize: 20 },
});
const link = 'https://picsum.photos/300/300/';
// const link = 'https://picsum.photos/300/300/?random';
const imagesArr = [];
for (let index = 0; index < 100; index++) {
  imagesArr.push(link);
}

export default ({ onPress }) => (
  <View style={{ zIndex: 1 }}>
    <FlatList
      data={imagesArr}
      renderItem={({ item: uri }) => {
        return (
          <TouchableOpacity onPress={onPress} style={{ zIndex: 1 }}>
            <Image
              source={{ uri }}
              style={{ width: '100%', height: 300, marginBottom: 5, zIndex: 1 }}
            />
          </TouchableOpacity>
        );
      }}
    />
  </View>
);
