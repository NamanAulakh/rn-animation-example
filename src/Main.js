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
  state = { hide: false, tabBarRef: null };

  onCancel = () => {
    // this.setState({ hide: false });
    this.tabBarRef.goToStart();
  };

  showList = () => {
    this.tabBarRef.goToBottom();
    // this.tabBarRef.goDown();
  };

  showFullTabBar = () => {
    // this.setState({ hide: true });
  };

  render() {
    const { hide, tabBarRef } = this.state;
    console.log('TCL: Main -> render -> tabBarRef', tabBarRef);

    return (
      <View style={{ flex: 1 }}>
        <Header />

        <CarList onPress={this.showList} />

        <CrossButton onPress={this.onCancel} />

        {!hide && (
          <>
            <TabBar
              setRef={ref => {
                this.tabBarRef = ref;
              }}
            />

            <BottomButton onPress={() => Alert.alert('Create RO')} />
          </>
        )}
      </View>
    );
  }
}
