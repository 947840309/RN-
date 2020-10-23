/**
 * @format
 */

import {AppRegistry} from 'react-native';
import root from './src/zujian/router.js';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => root);
