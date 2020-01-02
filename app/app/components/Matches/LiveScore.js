import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Config} from '../../common';
import {connect} from 'react-redux';
import {getLiveScore} from './MatchActions';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import ScoreBoard from './ScoreBoard';
import Batting from './Batting';
import Bowling from './Bowling';

class LiveScore extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.localteam.code} vs ${
      navigation.state.params.visitorteam.code
    }`,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Config.primaryColor,
      borderBottomWidth: 5,
      borderBottomColor: Config.accentColor,
      color: '#ffffff',
    },
  });

  componentDidMount() {
    this.getLiveScore();
  }

  getLiveScore = async () => {
    const {navigation} = this.props;
    const match_id = navigation.state.params.id;
    await this.props.getLiveScore(match_id);
  };

  render() {
    const {state, navigation} = this.props;

    return (
      <ScrollView>
        <View>
          {state.livescore.loading === true ? (
            <ActivityIndicator size="large" color={Config.primaryColor} />
          ) : (
            <>
              {state.livescore.error ? (
                <>
                  <Text style={styles.matchNotLive}>
                    {`Starts on ${moment(
                      navigation.state.params.starting_at,
                    ).format('ddd, MMM DD hh:mm A')}`}
                  </Text>
                </>
              ) : (
                <>
                  {state.livescore.score === null ? (
                    <>
                      <Text>No Live Data Found.</Text>
                    </>
                  ) : (
                    <>
                      {state.livescore.score.scoreboards.map(
                        scoreboard =>
                          scoreboard.type === 'total' && (
                            <View key={scoreboard.scoreboard}>
                              <ScoreBoard
                                score={scoreboard}
                                key={scoreboard.scoreboard}
                                team={
                                  scoreboard.team_id ===
                                  state.livescore.score.localteam.id
                                    ? state.livescore.score.localteam.name
                                    : state.livescore.score.visitorteam.name
                                }
                              />
                              <Batting
                                batting={state.livescore.score.batting}
                                battingTeam={scoreboard.scoreboard}
                              />
                              <Bowling
                                bowling={state.livescore.score.bowling}
                                bowlingTeam={scoreboard.scoreboard}
                              />
                            </View>
                          ),
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  matchNotLive: {
    // paddingHorizontal:20,
    padding: 20,
    textAlign: 'center',
  },
});
const mapStateToProps = state => {
  return {
    state: state.MatchReducers,
  };
};

export default connect(
  mapStateToProps,
  {getLiveScore},
)(LiveScore);
