import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import rpm from 'redux-promise-middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import rootReducer from './reducers';

const persistConfig = {
  key: 'vehical-rental',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const enhancers = applyMiddleware(rpm, logger);
const store = createStore(persistedReducer, enhancers);
const persistor = persistStore(store);

export {persistor, store};
