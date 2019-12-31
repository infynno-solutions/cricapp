import {Config} from '../../common';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import Errors from '../../utils/Errors';

export const loginUser = (user, navigation) => {
  return dispatch => {
    dispatch({type: 'LOGIN_INPROGRESS'});
    axios
      .post(`${Config.apiUrl}/login`, user)
      .then(res => {
        if (res.data.success === true) {
          AsyncStorage.setItem('isLoggedIn', 'true');
          AsyncStorage.setItem('token', res.data.token);
          dispatch({type: 'LOGIN_SUCCESS', payload: res.data.data});
          navigation.navigate('App');
        } else {
          dispatch({type: 'LOGIN_FAILURE', payload: res.data.errors});
          Alert.alert(res.data.message, Errors(res.data.errors));
        }
      })
      .catch(error => {
        dispatch({type: 'LOGIN_FAILURE', payload: error.data});
      });
  };
};

export const logoutUser = navigation => {
  AsyncStorage.removeItem('isLoggedIn');
  AsyncStorage.removeItem('token');
  navigation.navigate('Auth');
  Alert.alert('Success', 'Logged Out');

  return dispatch => {
    dispatch({type: 'LOGOUT_SUCCESS'});
  };
};

export const registerUser = (user, navigation) => {
  return dispatch => {
    dispatch({type: 'REGISTER_INPROGRESS'});
    axios
      .post(`${Config.apiUrl}/register`, user)
      .then(res => {
        if (res.data.success === true) {
          dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data.user,
            message: res.data.message,
          });
          navigation.navigate('Login');
          Alert.alert('Success', res.data.message);
        } else {
          dispatch({type: 'REGISTER_FAILURE', payload: res.data.errors});
          Alert.alert(res.data.message, Errors(res.data.errors));
        }
      })
      .catch(error => {
        dispatch({type: 'REGISTER_FAILURE', payload: error.data});
      });
  };
};
