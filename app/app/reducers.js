import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// Reducers
import AuthReducers from './components/Auth/AuthReducers';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = persistCombineReducers(config, {
  AuthReducers,
});

export default rootReducer;
