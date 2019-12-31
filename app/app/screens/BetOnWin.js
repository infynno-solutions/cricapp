import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {PlacedBets} from '../components';
import {Config} from '../common';

class BetOnWin extends Component {
  static navigationOptions = () => ({
    title: 'Place Bets',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Config.primaryColor,
      borderBottomWidth: 5,
      borderBottomColor: Config.accentColor,
      color: '#ffffff',
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: '',
      betAmount: '10',
    };
  }

  handlePlaceBet = () => {
    const {selectedTeam, betAmount} = this.state;
    if (selectedTeam !== '' && betAmount !== 0) {
      const selectedTeamName = this.props.navigation.state.params[selectedTeam];
      Alert.alert(
        'Success',
        `Your bet of ${betAmount} on ${selectedTeamName} has been placed.`,
      );
    }
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.betWrapper}>
            <Text style={styles.sectionTitle}>Select Team</Text>
            <RNPickerSelect
              onValueChange={value => this.setState({selectedTeam: value})}
              items={[
                {label: navigation.state.params.team1, value: 'team1'},
                {label: navigation.state.params.team2, value: 'team2'},
              ]}
              useNativeAndroidPickerStyle={true}
              style={pickerSelectStyles}
            />
            <Text style={styles.sectionTitle}>Bet on Win</Text>
            <TextInput
              placeholder="Bet Amount"
              style={styles.betInput}
              value={this.state.betAmount}
              keyboardType="number-pad"
              onChangeText={value => this.setState({betAmount: value})}
            />
            <View style={styles.increase}>
              <TouchableOpacity
                style={styles.increaseBtn}
                onPress={() => this.setState({betAmount: '50'})}>
                <Text style={styles.increaseBtnText}>+50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.increaseBtn}
                onPress={() => this.setState({betAmount: '100'})}>
                <Text style={styles.increaseBtnText}>+100</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.increaseBtn}
                onPress={() => this.setState({betAmount: '200'})}>
                <Text style={styles.increaseBtnText}>+200</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.increaseBtn}
                onPress={() => this.setState({betAmount: '500'})}>
                <Text style={styles.increaseBtnText}>+500</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.placeBtn}
              onPress={() => this.handlePlaceBet()}>
              <Text style={styles.placeBtnText}>Place Bet</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Placed Bets</Text>
            <PlacedBets />
            <PlacedBets />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
  betWrapper: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Config.highlightColor,
    marginBottom: 8,
  },
  betInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 20,
  },
  increase: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  increaseBtn: {
    marginVertical: 15,
    marginHorizontal: 5,
    backgroundColor: Config.primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  increaseBtnText: {
    color: '#fff',
  },
  placeBtn: {
    backgroundColor: Config.primaryColor,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    elevation: 5,
  },
  placeBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#ffffff',
    color: '#000',
    marginBottom: 10,
  },
  inputAndroid: {
    backgroundColor: '#ffffff',
    elevation: 5,
    color: '#000',
    marginBottom: 10,
  },
});

export default BetOnWin;
