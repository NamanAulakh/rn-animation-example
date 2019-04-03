import React, { Component } from 'react';
import {
  Dimensions,
  Alert,
  PanResponder,
  View,
  Animated,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
import CarList from './CarList';
import CrossButton from './CrossButton';
import BottomButton from './BottomButton';
import TabBar from './TabBar';

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    // flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
const deviceHeight = Dimensions.get('window').height;

export default class Main extends Component {
  state = { hide: false };

  onCancel = () => {
    this.setState({ hide: false });
  };

  showList = () => {
    this.setState({ hide: true });
  };

  showFullTabBar = () => {
    // this.setState({ hide: true });
  };

  render() {
    const { hide } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header />

        <CarList onPress={this.showList} />

        <CrossButton onPress={this.onCancel} />

        {!hide && (
          <>
            <TabBar onPress={this.showFullTabBar} />

            <BottomButton onPress={() => Alert.alert('Create RO')} />
          </>
        )}
      </View>
    );
  }
}
