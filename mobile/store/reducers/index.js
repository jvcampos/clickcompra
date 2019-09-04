import {combineReducers} from 'redux'
import userReducer from './userReducer'
import productsReducer from './productsReducer'

const reducers = combineReducers({
  UserReducer: userReducer,
  ProductReducer: productsReducer
})

export default reducers