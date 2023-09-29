import {combineReducers} from 'redux';
import authReducer from './auth';
// import authReducers from './auth';
// import authReducers from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ACTION_STRING } from '../actions/actionString';

const appReducers = combineReducers({
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT_FULFILLED') {
    AsyncStorage.removeItem('persist:vehical-rental').catch(err => {
      console.log(err);
    });
    state = undefined;
  }
  return appReducers(state, action);
};

export default rootReducer;
