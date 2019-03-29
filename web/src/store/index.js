import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'

import reducers from './reducers';

import history from "../routes/history";

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = [routerMiddleware(history), thunk];

const store = createStore(
  connectRouter(history)(persistedReducer),
  composeWithDevTools(applyMiddleware(...middlewares))
);

const persistor = persistStore(store)

export { store, persistor };
