import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Config} from '../../common';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {loginUser} from './AuthActions';
import CustomTextInput from '../CustomTextInput';

const {height} = Dimensions.get('window');

class Login extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.loginSchema = Yup.object().shape({
      username: Yup.string()
        .min(3)
        .required('Username is required.'),
      password: Yup.string()
        .min(4)
        .required('Password is Required'),
    });
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.loginContainer}>
        <ScrollView>
          <View style={styles.headerTitleBG}>
            <Text style={styles.headerTitle}>Hello! Welcome back</Text>
          </View>
          <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={this.loginSchema}
            onSubmit={async values => {
              const user = {
                username: values.username,
                password: values.password,
              };
              await this.props.loginUser(user, navigation);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View style={styles.loginForm}>
                <CustomTextInput
                  placeholder="Username"
                  onBlur={handleBlur('username')}
                  onChangeText={handleChange('username')}
                  value={values.username}
                  error={errors.username}
                />
                <CustomTextInput
                  placeholder="Password"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={errors.password}
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPassword}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                  style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
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

const mapStateToProps = state => {
  return {
    state: state.AuthReducers,
  };
};

export default connect(
  mapStateToProps,
  {loginUser},
)(Login);
