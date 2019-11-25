import React from 'react'
import App from './App';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from 'react-redux'
import store from './store'

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
console.disableYellowBox = true;
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0984e3',
    accent: '#f1c40f',
  }
};

export function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
