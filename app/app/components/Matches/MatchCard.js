import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Config} from '../../common';
import Odds from './Odds';
import moment from 'moment';

class MatchCard extends Component {
  render() {
    const {navigation, match} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.matchContainer}
        onPress={() =>
          navigation.navigate('BetOnWin', {
            id: match.unique_id,
            team1: match['team-1'],
            team2: match['team-2'],
            time: match.dateTimeGMT,
          })
        }>
        <View style={styles.leagueTime}>
          <Text style={styles.league}>{match.type}</Text>
          <Text style={styles.time}>
            {moment(match.dateTimeGMT).format('DD/MM/YYYY hh:mm A')}
          </Text>
        </View>
        <View>
          <Text style={styles.matchName}>{`${match['team-1']} vs ${
            match['team-2']
          }`}</Text>
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

export default MatchCard;
