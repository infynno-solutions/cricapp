import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Animated,
  RefreshControl,
} from 'react-native';
import CustomHeader from '../CustomHeader';
import MatchCard from './MatchCard';
import {Config} from '../../common';
import {connect} from 'react-redux';
import {fetchMatches} from './MatchActions';

const AnimatedListView = Animated.createAnimatedComponent(FlatList);

class ExploreMatches extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  componentDidMount() {
    this.fetchMatches();
  }

  fetchMatches = async () => {
    await this.props.fetchMatches();
  };

  renderMatches = ({item, index}) => {
    const {navigation} = this.props;
    return <MatchCard navigation={navigation} match={item} key={index} />;
  };

  render() {
    const {state} = this.props;

    return (
      <View style={styles.homeContainer}>
        <CustomHeader title="CricApp" />
        {state.isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <AnimatedListView
              data={state.matches}
              keyExtractor={(item, index) => `matched-${item.id} || ${index}`}
              renderItem={this.renderMatches}
              refreshing={state.isLoading}
              refreshControl={
                <RefreshControl
                  refreshing={state.isLoading}
                  onRefresh={() => this.fetchMatches()}
                />
              }
            />
          </>
        )}
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

const mapStateToProps = state => {
  return {
    state: state.MatchReducers,
  };
};
export default connect(
  mapStateToProps,
  {fetchMatches},
)(ExploreMatches);
