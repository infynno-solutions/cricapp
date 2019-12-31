import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {View, StyleSheet, StatusBar} from 'react-native';
import RootRouter from './app/navigation/RootRouter';

class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <View style={styles.appContainer}>
          <RootRouter />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
