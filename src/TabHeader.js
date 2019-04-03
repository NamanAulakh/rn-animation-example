import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles, tabs } from './constants';

export default ({ activeTab, onPress }) => (
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
        <TouchableOpacity key={index} style={tabStyles} onPress={() => onPress(key)}>
          <Text style={tabTextStyles}>{key}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);
