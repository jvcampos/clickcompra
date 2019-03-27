import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './store'

import Login from "./components/login/login"
// import MenuSuperior from './components/dashboard/menusuperior/menusuperior'

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Login />
        </Provider>
      </div>
    );
  }
}

export default App;
