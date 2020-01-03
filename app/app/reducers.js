import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// Reducers
import AuthReducers from './components/Auth/AuthReducers';
import MatchReducers from './components/Matches/MatchReducers';
import BetsReducers from './components/Bets/BetsReducers';
import WalletReducers from './components/Wallet/WalletReducers';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['MatchReducers'],
};

const rootReducer = persistCombineReducers(config, {
  AuthReducers,
  MatchReducers,
  BetsReducers,
  WalletReducers,
});

export default rootReducer;
