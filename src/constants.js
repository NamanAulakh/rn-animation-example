import React from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  cont: {
    borderTopWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    top: 380,
    width: '100%',
    zIndex: 3,
    position: 'absolute',
  },
  container: {
    height: 60,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3,
  },
  extra: {
    height: 15,
    width: 15,
    borderRadius: 20,
    backgroundColor: 'red',
    marginRight: 8,
  },
  commonTabCont: {
    paddingBottom: 200,
    marginHorizontal: 5,
    justifyContent: 'center',
    zIndex: 3,
    width,
  },
  commonTabText: {
    marginTop: height / 3,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});

/**
 * Reusable Components
 */
const Section = ({ heading, description, extra, index }) => {
  const headingStyles = {
    fontSize: 15,
    fontWeight: extra ? 'bold' : '100',
    color: index === 0 ? 'black' : 'rgba(162, 167, 172, 1)',
  };

  return (
    <View style={{ flex: 1, padding: 10, flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <Text style={headingStyles}>{heading}</Text>

        <Text style={{ color: 'rgba(108, 119, 130, 1)' }}>{description}</Text>
      </View>

      {extra && (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={styles.extra} />

          <Text>{extra}</Text>
        </View>
      )}
    </View>
  );
};
const GeneralSection = () => (
  <ScrollView
    contentContainerStyle={{
      paddingBottom: 300,
      marginHorizontal: 5,
      width,
    }}
  >
    {generalSectionsArr.map((item, index) => (
      <Section {...item} index={index} key={index} />
    ))}
  </ScrollView>
);
const CommonTab = text => (
  <ScrollView contentContainerStyle={styles.commonTabCont}>
    <Text style={styles.commonTabText}>{text}</Text>
  </ScrollView>
);
/**
 * Data
 */
const generalSectionsArr = [
  { heading: '2016 Infiniti Q50', description: 'Space Grey', extra: 'PDI' },
  { heading: 'Stock Number', description: 'T3988' },
  { heading: 'VIN', description: 'T3988YUTYUTTT' },
  { heading: 'State', description: 'Stocked-in' },
  { heading: 'Recieved on', description: 'Aug 24, 2018' },
  { heading: 'Vehicle Type', description: 'New' },
  { heading: 'Age', description: '32 days' },
  { heading: 'Base Retail Price', description: '$200' },
  { heading: 'Base Retail Price', description: '$200' },
  { heading: 'Base Retail Price', description: '$200' },
  { heading: 'Base Retail Price', description: '$200' },
  { heading: 'Base Retail Price', description: '$200' },
  { heading: 'Base Retail Price', description: '$200' },
  { heading: 'Base Retail Price', description: '$200' },
];
const tabs = [
  { heading: 'General', Component: GeneralSection },
  { heading: 'Pricing', Component: () => CommonTab('Pricing') },
  { heading: 'Parts', Component: () => CommonTab('Parts') },
  { heading: 'Damages', Component: () => CommonTab('Damages') },
];

module.exports = { styles, tabs, height, width };
