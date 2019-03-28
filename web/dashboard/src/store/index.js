import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from 'redux-thunk'

import reducers from './reducers';

import history from "../routes/history";

const middlewares = [routerMiddleware(history), thunk];

const store = createStore(
  connectRouter(history)(reducers),
  applyMiddleware(...middlewares)
);

export default store;