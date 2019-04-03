import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles, tabs } from './constants';

export default ({ activeTab, onPress }) => (
  <View style={styles.container}>
    {tabs.map(({ heading }, index) => {
      const tabStyles = {
        flex: 1,
        paddingBottom: 15,
        borderBottomWidth: 5,
        borderBottomColor: activeTab === index ? blue : gray,
        zIndex: 3,
      };
      const tabTextStyles = {
        fontSize: 20,
        fontWeight: 'bold',
        color: activeTab === index ? blue : gray,
        alignSelf: 'center',
      };

      return (
        <TouchableOpacity key={index} style={tabStyles} onPress={() => onPress(index)}>
          <Text style={tabTextStyles}>{heading}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);
