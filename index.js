if (__DEV__) {
  import('./ReactotronConfig.js').then(() =>
    console.log('Reactotron Configured'),
  );
}
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import SplashScreen from './src/components/SplashScreen';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'Non-serializable values were found in the navigation state',
]);

const themeCheckBox = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: '#FFCD61',
  },
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <NavigationContainer>
        <PaperProvider theme={themeCheckBox}>
          <Router />
        </PaperProvider>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
