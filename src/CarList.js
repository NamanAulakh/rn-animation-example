import React from 'react';
import { Image, View, TouchableOpacity, FlatList } from 'react-native';
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
      renderItem={({ item: uri }) => (
        <TouchableOpacity onPress={onPress} style={{ zIndex: 1 }}>
          <Image
            source={{ uri }}
            style={{ width: '100%', height: 300, marginBottom: 5, zIndex: 1 }}
          />
        </TouchableOpacity>
      )}
    />
  </View>
);
