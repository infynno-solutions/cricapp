import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {CustomHeader, Match} from '../components';
import {Config} from '../common';

class Home extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.homeContainer}>
        <CustomHeader title="CricApp" />
        <Match navigation={navigation} />
        <Match navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
});

export default Home;
