/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Setup from './js/pages/setup';
export default class App extends Component {
  render() {
    return (
     <Setup/>
    );
  }
}
AppRegistry.registerComponent('App', () => App);