
import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Login from '../containers/login/login'
import Solicitacao from '../containers/solicitacao/solicitacao'
import Supermarket from '../components/supermarket/Supermarket'
import Categories from '../components/categories/Categories'
import Products from '../components/products/Products'
import Home from '../components/home/Home'
import Admin from '../containers/admin/admin'

import history from "./history";

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/solicitacao" component={Solicitacao} />
      <Route path="/home" component={Home}/>
      <Route path="/categories" component={Categories} />
      <Route path="/supermarket" component={Supermarket} />
      <Route path="/products" component={Products} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
