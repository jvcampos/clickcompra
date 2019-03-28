import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from 'redux-thunk'

import reducers from './reducers';

import history from "../routes/history";

const middlewares = [routerMiddleware(history), thunk];

const store = createStore(
  connectRouter(history)(reducers),
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
