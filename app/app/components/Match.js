import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Config} from '../common';
import Odds from './Odds';

class Match extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.matchContainer}
        onPress={() =>
          navigation.navigate('BetOnWin', {
            team1: 'Manchester United',
            team2: 'Liverpool FC',
            time: '25/12/2019 17:00',
          })
        }>
        <View style={styles.leagueTime}>
          <Text style={styles.league}>England/Premier League</Text>
          <Text style={styles.time}>25/12/2019 17:00</Text>
        </View>
        <View>
          <Text style={styles.matchName}>
            Manchester United vs Liverpool FC
          </Text>
        </View>
        <Odds team1={40} team2={60} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  matchContainer: {
    flex: 0,
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  leagueTime: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  league: {
    fontWeight: 'bold',
    color: Config.highlightColor,
  },
  time: {
    fontWeight: 'bold',
    color: Config.highlightColor,
  },
  matchName: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Match;
