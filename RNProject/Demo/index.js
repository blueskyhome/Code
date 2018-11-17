import { AppRegistry,AsyncStorage } from 'react-native';
import App from "./App";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import Storage from 'react-native-storage';
import sync from './sync';
var storage = new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:null,
    enableCache:true,
    sync:sync
});
global.storage = storage;
AppRegistry.registerComponent('Demo', () => App);
