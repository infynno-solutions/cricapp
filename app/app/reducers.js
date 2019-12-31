import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// Reducers
import AuthReducers from './components/Auth/AuthReducers';
import MatchReducers from './components/Matches/MatchReducers';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = persistCombineReducers(config, {
  AuthReducers,
  MatchReducers,
});

export default rootReducer;
