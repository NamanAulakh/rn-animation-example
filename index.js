/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App';
import App from './src/index';
import { name as appName } from './app.json';
import './src/global';
// eslint-disable-next-line no-console
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
