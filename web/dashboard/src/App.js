import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './store'
import Routes from './routes/index'

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Routes />
        </Provider>
      </div>
    );
  }
}

export default App;
