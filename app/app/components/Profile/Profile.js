import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomHeader from '../CustomHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Config} from '../../common';
import {connect} from 'react-redux';
import {logoutUser} from '../Auth/AuthActions';

class Profile extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    const {navigation} = this.props;
    return (
      <>
        <CustomHeader title="Profile" />
        <View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => await this.props.logoutUser(navigation)}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: Config.primaryColor,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

const mapStateToProps = state => {
  return {state: state.AuthReducers};
};

export default connect(
  mapStateToProps,
  {logoutUser},
)(Profile);
