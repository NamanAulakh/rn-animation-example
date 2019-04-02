/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './src/global';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
