import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Config} from '../common';

import Home from '../screens/Home';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Contests from '../screens/Contests';
import BetOnWin from '../screens/BetOnWin';

const HomeStack = createStackNavigator(
  {Home, Contests, BetOnWin},
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="home-variant-outline" size={24} color={tintColor} />
      ),
    }),
  },
);

const ProfileStack = createStackNavigator(
  {Home, Contests},
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => (
        <Icon name="account-outline" size={24} color={tintColor} />
      ),
    }),
  },
);

const AppStack = createBottomTabNavigator(
  {HomeStack, ProfileStack},
  {
    tabBarOptions: {
      activeTintColor: Config.primaryColor,
      inactiveTintColor: '#666666',
      showLabel: true,
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

const AuthStack = createStackNavigator({
  Login: Login,
  ForgotPassword: ForgotPassword,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);
