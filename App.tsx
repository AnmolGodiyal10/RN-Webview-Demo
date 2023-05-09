/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';

import {check, request, openSettings} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import createInvoke from 'react-native-webview-invoke/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => {
        resolve(pos);
      },
      err => {
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
}

export default class App extends React.Component {
  webview: WebView | undefined;
  invoke = createInvoke(() => this.webview);

  render() {
    this.invoke.define('checkPermission', check);
    this.invoke.define('requestPermission', request);
    this.invoke.define('getCurrentPosition', getCurrentPosition);
    this.invoke.define('openSettings', openSettings);
    // Note: add 'useWebKit' property for rn > 0.59
    return (
      <WebView
        style={styles.container}
        useWebKit
        // @ts-expect-error
        ref={webview => (this.webview = webview)}
        onMessage={this.invoke.listener}
        source={{uri: 'https://8sfcjs.csb.app/'}}
        originWhitelist={['*']}
      />
    );
  }
}
