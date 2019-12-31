import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Config} from '../common';

const {height} = Dimensions.get('window');

class Login extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    const {navigation} = this.props;
    // console.log(navigaition);

    return (
      <View style={styles.loginContainer}>
        <ScrollView>
          <View style={styles.headerTitleBG}>
            <Text style={styles.headerTitle}>Hello! Welcome back</Text>
          </View>
          <View style={styles.loginForm}>
            <TextInput
              placeholder="Your Phone Number"
              style={styles.formInput}
            />
            <TextInput placeholder="Password" style={styles.formInput} />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('App')}
              style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
  headerTitleBG: {
    backgroundColor: Config.primaryColor,
    height: height / 3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: '30%',
  },
  loginForm: {
    backgroundColor: '#ffffff',
    marginTop: -50,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 30,
    elevation: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 50,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  forgotPassword: {
    textAlign: 'center',
    color: Config.primaryColor,
    fontSize: 18,
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: Config.primaryColor,
    color: '#ffffff',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Login;
