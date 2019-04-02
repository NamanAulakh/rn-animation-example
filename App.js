// import React from 'react';
// import {
//   View,
//   Button,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Animated,
// } from 'react-native';
// import SlidingUpPanel from 'rn-sliding-up-panel';

// console.disableYellowBox = true;
// const { height, width } = Dimensions.get('window');
// const styles = StyleSheet.create({
//   container1: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container2: {
//     flex: 1,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 10,
//     borderRadius: 10,
//   },
// });

// export default class MyComponent extends React.Component {
//   state = { allowDragging: true };

//   render() {
//     const { allowDragging } = this.state;

//     return (
//       <View style={styles.container1}>
//         {/* <Button title="Show panel" onPress={() => this._panel.show()} /> */}

//         <SlidingUpPanel
//           ref={c => {
//             this._panel = c;
//             this._panel.show();
//           }}
//           draggableRange={{ top: height - 70, bottom: height / 2 }}
//           backdropOpacity={0}
//           allowMomentum
//           minimumDistanceThreshold={100}
//           animatedValue={new Animated.Value(0)}
//           // allowMomentum
//           // allowDragging={allowDragging}
//           onDragStart={(position, gestureState) => {
//             console.log(
//               'TCL: MyComponent -> render -> position, gestureState',
//               position,
//               gestureState.y0
//             );
//             // this._panel.scrollTo(0);
//           }}
//         >
//           <View style={styles.container2}>
//             <Text>Here is the content inside panel</Text>
//             <Button title="Hide" onPress={() => this._panel.hide()} />
//           </View>
//         </SlidingUpPanel>
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import {
  Dimensions,
  PanResponder,
  View,
  Animated,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import Main from './src/Main';

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

export default class CustomAnimation extends Component {
  toggle() {
    this.props.toggle();
  }

  setOffset(value) {
    // this.props.setOffset(value);
  }

  componentWillMount() {
    this._animatedValue = new Animated.ValueXY();
    this._value = { x: 0, y: 0 };

    this._animatedValue.addListener(value => (this._value = value));

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._animatedValue.setOffset({ x: this._value.x, y: this._value.y });
        this._animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this._animatedValue.x, dy: this._animatedValue.y },
      ]), // Creates a function to handle the movement and set offsets
      onPanResponderRelease: e => {
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@' , this._animatedValue.y);
        if (this._animatedValue.y._offset === 0) {
          if (this._animatedValue.y._value > -1 * (deviceHeight / 4)) {
            // console.log('goto borderline');
            Animated.timing(this._animatedValue.y, {
              toValue: 0,
              duration: 100,
            }).start();
          } else {
            // console.log('goToTop');
            // this.toggle();
            this.setOffset(1);
            Animated.timing(this._animatedValue.y, {
              toValue:
                deviceHeight > 600
                  ? -1 * deviceHeight + 180
                  : -1 * deviceHeight + 160,
              duration: 100,
            }).start();
          }
        } else {
          if (this._animatedValue.y._value < deviceHeight / 3) {
            // console.log('...gotoTop');
            Animated.timing(this._animatedValue.y, {
              toValue: 0,
              duration: 100,
            }).start();
          } else {
            // console.log('...goto borderline');
            // this.toggle();
            this.setOffset(0);
            Animated.timing(this._animatedValue.y, {
              toValue: -1 * this._animatedValue.y._offset,
              duration: 100,
            }).start();
          }
        }
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('+++', nextProps);
    if (!nextProps.arrowUp) {
      // console.log('***gotoTop');
      this.setOffset(1);
      if (this._animatedValue.y._offset === 0) {
        Animated.timing(this._animatedValue.y, {
          toValue:
            deviceHeight > 600
              ? -1 * deviceHeight + 180
              : -1 * deviceHeight + 160,
          duration: 100,
        }).start();
      } else {
        Animated.timing(this._animatedValue.y, {
          toValue: 0,
          duration: 100,
        }).start();
      }
    } else {
      // console.log('***goto borderline');
      this.setOffset(0);
      Animated.timing(this._animatedValue.y, {
        toValue: -1 * this._animatedValue.y._offset,
        duration: 100,
      }).start();
    }
  }

  render() {
    return <Main />;
    // return (
    //   <Animated.View
    //     style={[
    //       {
    //         transform: [{ translateY: this._animatedValue.y }],
    //         // flex: 1,
    //       },
    //     ]}
    //     {...this._panResponder.panHandlers}
    //   >
    //     {/* <View pointerEvents="auto"> */}
    //     <View>
    //       <View style={styles.container2}>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>
    //         <Text>Here is the content inside panel</Text>

    //         <Button title="Hide" onPress={() => this._panel.hide()} />
    //       </View>
    //     </View>
    //   </Animated.View>
    // );
  }
}
