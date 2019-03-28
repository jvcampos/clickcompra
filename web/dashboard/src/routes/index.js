
import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Login from '../components/login/login'
import Home from '../components/menusuperior/menusuperior'

import history from "./history";

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;