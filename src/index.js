import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import Header from './Header';
import CarList from './CarList';
import CrossButton from './CrossButton';
import BottomButton from './BottomButton';
import TabBar from './TabBar';

export default class Main extends Component {
  onCancel = () => {
    this.tabBarRef.goToStart();
    this.bottomButtonRef.goToStart();
  };

  showList = () => {
    this.tabBarRef.goToBottom();
    this.bottomButtonRef.goToBottom();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />

        <CarList onPress={this.showList} />

        <CrossButton onPress={this.onCancel} />

        <TabBar
          setRef={ref => {
            this.tabBarRef = ref;
          }}
        />

        <BottomButton
          onPress={() => Alert.alert('Create RO')}
          setRef={ref => {
            this.bottomButtonRef = ref;
          }}
        />
      </View>
    );
  }
}
